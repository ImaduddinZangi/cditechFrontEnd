import React, { useState, useEffect } from "react";
import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { getAddressFromLatLng } from "../../../utils/utils";
import { Inspection } from "../../../redux/features/inspectionSlice";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    paddingBottom: 20,
  },
  address: {
    marginBottom: 10,
    flexDirection: "row",
    paddingBottom: 10,
    borderBottom: "1 solid #ccc",
  },
  scoreSection: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    maxWidth: "100%",
    gap: "7vw",
    marginBottom: 10,
    paddingVertical: 5,
    borderBottom: "1 solid #ccc",
  },
  floatScoreSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "100%",
    marginBottom: 10,
    paddingVertical: 5,
    borderBottom: "1 solid #ccc",
  },
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 10,
  },
  image: {
    width: 30,
    height: 30,
    marginBottom: 20,
  },
  scoreTitle: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  smallField: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    fontSize: 10,
  },
  pumpsSection: {
    marginBottom: 10,
  },
  pumpField: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

interface MyDocumentProps {
  data: Inspection;
}

const MyDocument: React.FC<MyDocumentProps> = ({ data }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    // Fetch both addresses based on the route coordinates
    const fetchAddresses = async () => {
      if (data.route && data.route.length >= 2) {
        const address = await getAddressFromLatLng(
          data.route[0].latitude,
          data.route[0].longitude
        );

        setAddress(address);
      }
    };

    fetchAddresses();
  }, [data.route]);

  return (
    <Document>
      <Page style={styles.page}>
        {/* Image Section */}
        <View style={styles.row}>
          <Image style={styles.image} src="/assets/Content.png" />

          {/* Header Section */}
          <View style={styles.header}>
            <Text>Monthly Lift Station</Text>
            <Text>Inspection Default</Text>
            <Text>
              Overall Score: {data.checklists[0]?.overallScore || "N/A"}
            </Text>
          </View>
          <Text>Oct 2, 2024</Text>
        </View>

        {/* Address Section */}
        <View style={styles.address}>
          <Text style={styles.fieldLabel}>Address:&nbsp;</Text>
          <Text>{address}</Text>
        </View>

        {/* Scores Section */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Structure:</Text>
            <Text>{data.checklists[0]?.structure || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Panel:</Text>
            <Text>{data.checklists[0]?.panel || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Contactors:</Text>
            <Text>{data.checklists[0]?.contactors || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Pipes:</Text>
            <Text>{data.checklists[0]?.pipes || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Breakers:</Text>
            <Text>{data.checklists[0]?.breakers || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Alarm Light:</Text>
            <Text>{data.checklists[0]?.alarmLight || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Wires:</Text>
            <Text>{data.checklists[0]?.wires || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Alarm:</Text>
            <Text>{data.checklists[0]?.alarm || "N/A"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Thermals:</Text>
            <Text>{data.checklists[0]?.thermals || "N/A"}</Text>
          </View>
        </View>

        {/* Pumps Section */}
        <View style={styles.pumpsSection}>
          {data.checklists[0]?.pumpScores &&
          Object.entries(data.checklists[0].pumpScores).length > 0 ? (
            Object.entries(data.checklists[0].pumpScores).map(
              ([pumpKey, pump]) => (
                <View key={pumpKey} style={styles.pumpField}>
                  <Text>{pump.pumpName}:</Text>
                  <Text>Runs: {pump.runs ? "Yes" : "No"}</Text>
                  <Text>Amps: {pump.amps ?? "N/A"}</Text>
                  <Text>Contactors: {pump.contactors ?? "N/A"}</Text>
                </View>
              )
            )
          ) : (
            <Text>No pump data available</Text>
          )}
        </View>

        {/* Float Scores Section */}
        <View style={styles.floatScoreSection}>
          {data.checklists[0]?.floatScores && (
            <>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Float 1:</Text>
                <Text>{data.checklists[0].floatScores.float1 || "N/A"}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Float 2:</Text>
                <Text>{data.checklists[0].floatScores.float2 || "N/A"}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Float 3:</Text>
                <Text>{data.checklists[0].floatScores.float3 || "N/A"}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Float 4:</Text>
                <Text>{data.checklists[0].floatScores.float4 || "N/A"}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Float 5:</Text>
                <Text>{data.checklists[0].floatScores.float5 || "N/A"}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Float 6:</Text>
                <Text>{data.checklists[0].floatScores.float6 || "N/A"}</Text>
              </View>
              <View style={styles.scoreRow}>
                <Text style={styles.fieldLabel}>Alarm Float:</Text>
                <Text>
                  {data.checklists[0].floatScores.alarmFloat || "N/A"}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* Cleaning and Tech Note Section */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreRow}>
            <Text>Station Needs Cleaning: </Text>
            <Text>{data.checklists[0]?.cleaning ? "Yes" : "No"}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text>Tech Note: </Text>
            <Text>{data.comments || "N/A"}</Text>
          </View>
        </View>

        {/* Footer Section */}
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <Text>Completed PN:</Text>
            <Text>Oct 2, 2024</Text>
          </View>
          <View style={styles.footerRow}>
            <Text>Completed By: {data.client?.first_name || "N/A"}</Text>
            <Text>Inspection ID: {data.id || "N/A"}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
