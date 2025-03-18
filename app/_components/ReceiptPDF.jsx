// components/ReceiptPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Helvetica",
  },
  logo: {
    width: 100,
    marginBottom: 20,
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #eee",
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#2563eb",
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  addressSection: {
    width: "48%",
  },
  label: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  value: {
    fontSize: 12,
    marginBottom: 3,
  },
  table: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: "#f8fafc",
    padding: 8,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tableCol: {
    flex: 1,
    fontSize: 12,
  },
  paymentTotal: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    color: "#666",
    fontSize: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
});

// Function to format the date as YYYY/MM/DD HH:mm
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// PDF Receipt Component
const ReceiptPDF = ({ 
  transactionId, 
  packageName, 
  amount, 
  date,
  customerName,
  customerEmail,
  customerPhone
}) => {
  const formattedDate = formatDate(new Date(date));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <Image
          style={styles.logo}
          src="/logo.png"
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Payment Receipt</Text>
          <Text style={styles.value}>Transaction ID: {transactionId || 'Processing'}</Text>
          <Text style={styles.value}>Date: {formattedDate}</Text>
        </View>

        {/* Addresses Side by Side */}
        <View style={styles.addressContainer}>
          {/* Company Info */}
          <View style={styles.addressSection}>
            <Text style={styles.label}>From:</Text>
            <Text style={styles.value}>Awesome Photo Studio</Text>
            <Text style={styles.value}>Magomeni</Text>
            <Text style={styles.value}>Dar es salaam</Text>
            <Text style={styles.value}>Tanzania</Text>
            <Text style={styles.value}>+255 713 500 807</Text>
          </View>

          {/* Customer Info */}
          <View style={styles.addressSection}>
            <Text style={styles.label}>Bill To:</Text>
            <Text style={styles.value}>{customerName}</Text>
            <Text style={styles.value}>{customerEmail}</Text>
            <Text style={styles.value}>{customerPhone}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol}>Description</Text>
            <Text style={styles.tableCol}>Date</Text>
            <Text style={styles.tableCol}>Amount</Text>
          </View>

          {/* Table Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>{packageName}</Text>
            <Text style={styles.tableCol}>{formattedDate}</Text>
            <Text style={styles.tableCol}>{amount}</Text>
          </View>
        </View>

        {/* Payment Total */}
        <View style={styles.paymentTotal}>
          <Text style={[styles.label, { marginRight: 20 }]}>Total Amount Paid: </Text>
          <Text style={[styles.value, { fontWeight: 'bold' }]}>{amount}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Awesome Photo Studio</Text>
          <Text>Tanzania</Text>
          <Text>+255 713 500 807 | https://apstudiostz.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPDF;