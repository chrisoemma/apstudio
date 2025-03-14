// components/ReceiptPDF.js
import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Helvetica",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
  },
  logo: {
    width: 100, // Adjust the width of the logo
    height: 80, // Adjust the height of the logo
    marginBottom: 10,
    alignSelf: "center", // Center the logo
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 10,
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "100%",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    alignItems: "center",
    paddingVertical: 5,
  },
  tableHeader: {
    fontSize: 12,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    alignItems: "center",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  tableCol: {
    width: "33%",
    fontSize: 12,
  },
  footer: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 20,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  addressSection: {
    width: "48%", // Adjust width to fit side by side
  },
  paymentTotal: {
    flexDirection: "row",
    justifyContent: "flex-end", // Align to the right
    marginBottom: 10,
  },
});

// Function to format the date as YYYY/MM/DD HH:mm
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

// PDF Receipt Component
const ReceiptPDF = ({ bookingId, packageName, amount, date }) => {
  const formattedDate = formatDate(new Date(date)); // Format the date

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <Image
          style={styles.logo}
          src="/logo.png" // Replace with the path to your logo
        />

        {/* Header */}
        <View style={styles.header}>
          <Text>Payment Date: {formattedDate}</Text>
        </View>

        {/* Addresses Side by Side */}
        <View style={styles.addressContainer}>
          {/* Remit To */}
          <View style={styles.addressSection}>
            <Text style={styles.label}>Remit to:</Text>
            <Text style={styles.value}>Awesome photo studio</Text>
            <Text style={styles.value}>Magomeni</Text>
            <Text style={styles.value}>Dar es salaam</Text>
            <Text style={styles.value}>Tanzania</Text>
          </View>

          {/* Invoice To */}
          <View style={styles.addressSection}>
            <Text style={styles.label}>Invoice To:</Text>
            <Text style={styles.value}>Baraka Juma</Text>
            <Text style={styles.value}>Mbezi Street</Text>
            <Text style={styles.value}>Dar es Salaam, Dar es Salaam, 255 TZ</Text>
          </View>
        </View>

        {/* Receipt Title */}
        <View style={styles.title}>
          <Text>Receipt for Payment #{packageName}</Text>
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
            <Text style={styles.tableCol}>Payment for package {packageName}</Text>
            <Text style={styles.tableCol}>{formattedDate}</Text>
            <Text style={styles.tableCol}>${amount}</Text>
          </View>
        </View>

        {/* Payment Total (Aligned to the Right) */}
        <View style={styles.paymentTotal}>
          <Text style={styles.label}>Payment Total (USD): </Text>
          <Text style={styles.value}>${amount}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Awesome photo studio</Text>
          <Text>Tanzania</Text>
          <Text>+255 713 500 807 https://apstudiostz.com</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ReceiptPDF;