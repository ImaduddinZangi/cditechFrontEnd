import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Inspection } from "../../../redux/features/inspectionSlice";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  field: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
  },
});

interface MyDocumentProps {
  data: Inspection;
}

const MyDocument: React.FC<MyDocumentProps> = ({ data }) => (
  <Document>
    <Page style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text>Monthly Lift Station</Text>
        <Text>{data.name || "Unnamed Inspection"}</Text>
        <Text>Overall Score: {data.checklists[0]?.overallScore || "N/A"}</Text>
      </View>

      {/* Address Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Address:</Text>
        <Text>{data.asset?.location || "N/A"}</Text>
      </View>

      {/* Scores Section */}
      {data.scores && (
        <View style={styles.section}>
          <View style={styles.field}>
            <Text style={styles.label}>Structure:</Text>
            <Text>{data.scores[0].structureScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Panel:</Text>
            <Text>{data.scores[0].panelScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Contactors:</Text>
            <Text>{data.scores[0].contactorsScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Pipes:</Text>
            <Text>{data.scores[0].pipesScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Breakers:</Text>
            <Text>{data.scores[0].breakersScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Alarm Light:</Text>
            <Text>{data.scores[0].alarmLightScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Wires:</Text>
            <Text>{data.scores[0].wiresScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Alarm:</Text>
            <Text>{data.scores[0].alarmScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Thermals:</Text>
            <Text>{data.scores[0].thermalsScore || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Float 1:</Text>
            <Text>{data.scores[0].floatScores?.float1 || "N/A"}</Text>
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Float 2:</Text>
            <Text>{data.scores[0].floatScores?.float2 || "N/A"}</Text>
          </View>
        </View>
      )}

      {/* Checklist Items */}
      <View style={styles.section}>
        <Text style={styles.label}>Checklist Items:</Text>
        {data.checklists?.map((checklist, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.label}>
              {checklist.name || "Unnamed Checklist"} - Overall Score:{" "}
              {checklist.overallScore || "N/A"}
            </Text>
            {/* You may need to iterate over items if they exist */}
          </View>
        ))}
      </View>

      {/* Route Section */}
      <View style={styles.section}>
        <Text style={styles.label}>Route:</Text>
        {data.route?.map((point, index) => (
          <View key={index} style={styles.field}>
            <Text>Point {index + 1}: </Text>
            <Text>
              Lat: {point.latitude}, Long: {point.longitude}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text>Comments: {data.comments || "N/A"}</Text>
        <Text>
          Completed PN:{" "}
          {data.completedDate
            ? new Date(data.completedDate).toLocaleDateString()
            : "N/A"}
        </Text>
        <Text>Completed By: {data.client?.name || "N/A"}</Text>
        <Text>Inspection ID: {data.id || "N/A"}</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument;
