import { useState, useEffect } from "react";
import { createEntry, updateEntry, deleteEntry, listenToEntries } from "@/lib/firestore";
import { useAuth } from "./useAuth";
import type { Entry, InsertEntry, Stats } from "@shared/schema";
import type { ChartData } from "@/types";

export function useEntries() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalEntries: 0,
    totalBottles: 0,
    totalRevenue: 0,
    avgPerDay: 0,
  });
  const [chartData, setChartData] = useState<ChartData>({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Bottles',
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: '#1976D2',
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      fill: true,
      tension: 0.4
    }]
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenToEntries(user.uid, (entriesData) => {
      setEntries(entriesData);
      calculateStats(entriesData);
      calculateChartData(entriesData);
    });

    return () => unsubscribe();
  }, [user]);

  const calculateStats = (entriesData: Entry[]) => {
    const totalEntries = entriesData.length;
    const totalBottles = entriesData.reduce((sum, entry) => sum + entry.bottles, 0);
    const totalRevenue = entriesData.reduce((sum, entry) => sum + entry.amount, 0);
    const avgPerDay = totalEntries > 0 ? Math.round(totalBottles / Math.max(totalEntries, 1)) : 0;

    setStats({
      totalEntries,
      totalBottles,
      totalRevenue,
      avgPerDay,
    });
  };

  const calculateChartData = (entriesData: Entry[]) => {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      last7Days.push({
        date: date.toISOString().split('T')[0],
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        bottles: 0
      });
    }

    entriesData.forEach(entry => {
      const entryDate = new Date(entry.timestamp).toISOString().split('T')[0];
      const dayData = last7Days.find(d => d.date === entryDate);
      if (dayData) {
        dayData.bottles += entry.bottles;
      }
    });

    setChartData({
      labels: last7Days.map(d => d.day),
      datasets: [{
        label: 'Bottles',
        data: last7Days.map(d => d.bottles),
        borderColor: '#1976D2',
        backgroundColor: 'rgba(25, 118, 210, 0.1)',
        fill: true,
        tension: 0.4
      }]
    });
  };

  const addEntry = async (entry: InsertEntry) => {
    if (!user) return;

    setIsAdding(true);
    try {
      await createEntry(user.uid, entry);
    } finally {
      setIsAdding(false);
    }
  };

  const updateEntryData = async (id: string, updates: Partial<Entry>) => {
    if (!user) return;

    setIsUpdating(true);
    try {
      await updateEntry(user.uid, id, updates);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteEntryData = async (id: string) => {
    if (!user) return;

    setIsDeleting(true);
    try {
      await deleteEntry(user.uid, id);
    } finally {
      setIsDeleting(false);
    }
  };

  const exportToExcel = () => {
    const XLSX = require('xlsx');
    
    // Prepare data for Excel
    const excelData = entries.map(entry => {
      const date = new Date(entry.timestamp);
      return {
        Date: date.toLocaleDateString(),
        Time: date.toLocaleTimeString(),
        Bottles: entry.bottles,
        Amount: entry.amount,
        Status: entry.status,
        'Total Value': `₹${entry.amount * entry.bottles}`
      };
    });

    // Add summary row
    const totalBottles = entries.reduce((sum, entry) => sum + entry.bottles, 0);
    const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalValue = entries.reduce((sum, entry) => sum + (entry.amount * entry.bottles), 0);

    excelData.push({
      Date: '',
      Time: '',
      Bottles: '',
      Amount: '',
      Status: '',
      'Total Value': ''
    });

    excelData.push({
      Date: 'SUMMARY',
      Time: '',
      Bottles: totalBottles,
      Amount: totalAmount,
      Status: '',
      'Total Value': `₹${totalValue}`
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const colWidths = [
      { wch: 12 }, // Date
      { wch: 10 }, // Time
      { wch: 8 },  // Bottles
      { wch: 10 }, // Amount
      { wch: 10 }, // Status
      { wch: 15 }  // Total Value
    ];
    ws['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Milk Tracker Data');

    // Generate filename with current date
    const filename = `milk-tracker-${new Date().toISOString().split('T')[0]}.xlsx`;
    
    // Save file
    XLSX.writeFile(wb, filename);
  };

  const exportToPDF = () => {
    const jsPDF = require('jspdf');
    require('jspdf-autotable');
    
    // Create new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210); // Blue color
    doc.text('Milk Bottle Tracker Report', 20, 20);
    
    // Add generation date
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Prepare table data
    const tableData = entries.map(entry => {
      const date = new Date(entry.timestamp);
      return [
        date.toLocaleDateString(),
        date.toLocaleTimeString(),
        entry.bottles.toString(),
        `₹${entry.amount}`,
        entry.status,
        `₹${entry.amount * entry.bottles}`
      ];
    });
    
    // Add summary row
    const totalBottles = entries.reduce((sum, entry) => sum + entry.bottles, 0);
    const totalAmount = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalValue = entries.reduce((sum, entry) => sum + (entry.amount * entry.bottles), 0);
    
    tableData.push([
      'TOTAL',
      '',
      totalBottles.toString(),
      `₹${totalAmount}`,
      '',
      `₹${totalValue}`
    ]);
    
    // Add table to PDF
    doc.autoTable({
      head: [['Date', 'Time', 'Bottles', 'Amount', 'Status', 'Total Value']],
      body: tableData,
      startY: 50,
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontSize: 11,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        0: { cellWidth: 25 }, // Date
        1: { cellWidth: 25 }, // Time
        2: { cellWidth: 20 }, // Bottles
        3: { cellWidth: 25 }, // Amount
        4: { cellWidth: 25 }, // Status
        5: { cellWidth: 30 }, // Total Value
      },
    });
    
    // Add footer with statistics
    const finalY = doc.autoTable.previous.finalY + 20;
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Summary Statistics:`, 20, finalY);
    doc.text(`Total Entries: ${entries.length}`, 20, finalY + 15);
    doc.text(`Total Bottles: ${totalBottles}`, 20, finalY + 30);
    doc.text(`Total Revenue: ₹${totalValue}`, 20, finalY + 45);
    
    // Generate filename with current date
    const filename = `milk-tracker-report-${new Date().toISOString().split('T')[0]}.pdf`;
    
    // Save PDF
    doc.save(filename);
  };

  return {
    entries,
    stats,
    chartData,
    isAdding,
    isUpdating,
    isDeleting,
    addEntry,
    updateEntry: updateEntryData,
    deleteEntry: deleteEntryData,
    exportToExcel,
    exportToPDF,
  };
}
