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
import { format } from "date-fns";
import { Inspection } from "../../../redux/features/inspectionSlice";
import { GetChecklist } from "../../../redux/features/inspectionChecklistSlice";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    display: "flex",
    flexDirection: "column",
    width: "100%",
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
    gap: "5vw",
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
    marginBottom: 2,
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
    marginBottom: 5,
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
  checklist: GetChecklist;
}

const MyDocument: React.FC<MyDocumentProps> = ({ data, checklist }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      if (data.route && data.route.length > 0) {
        try {
          const address = await getAddressFromLatLng(
            data.route[0].latitude,
            data.route[0].longitude
          );
          setAddress(address);
          console.log("The converted address is given as following", address);
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress("Address not found");
        }
      }
    };
    fetchAddresses();
  }, [data.route]);

  const getAnswerByText = (questionText: string): string => {
    const question = checklist?.questions.find(q => q.questionText === questionText);
    return question?.answer || "N/A";
  };

  const formattedScheduledDate = format(
    new Date(data.scheduledDate),
    "dd-MMM-yy"
  );

  const currentDate = format(new Date(), "dd-MMM-yy");

  return (
    <Document>
      <Page style={styles.page}>
        {/* Image Section */}
        <View style={styles.row}>
          <Image style={styles.image} src="/assets/Content.png" />

          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.fieldLabel}>{data.asset.assetType.name || "N/A"}</Text>
            <Text>Inspection Default</Text>
            <Text>
              Overall Score: {getAnswerByText("overallScore")}
            </Text>
          </View>
          <Text>{formattedScheduledDate || "N/A"}</Text>
        </View>

        {/* Address Section */}
        <View style={styles.address}>
          <Text style={styles.fieldLabel}>Address:&nbsp;</Text>
          <Text>{address || "N/A"}</Text>
        </View>

        {/* Scores Section */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Structure:</Text>
            <Text>{getAnswerByText("structure")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Panel:</Text>
            <Text>{getAnswerByText("panel")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Contactors:</Text>
            <Text>{getAnswerByText("contactors")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Pipes:</Text>
            <Text>{getAnswerByText("pipes")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Breakers:</Text>
            <Text>{getAnswerByText("breakers")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Alarm Light:</Text>
            <Text>{getAnswerByText("alarmLight")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Wires:</Text>
            <Text>{getAnswerByText("wires")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Alarm:</Text>
            <Text>{getAnswerByText("alarm")}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.fieldLabel}>Thermals:</Text>
            <Text>{getAnswerByText("thermals")}</Text>
          </View>
        </View>

        {/* Pumps Section */}
        <View style={styles.pumpsSection}>
          {["pump1", "pump2", "pump3", "pump4"].map((pump, index) => (
            <View key={index} style={styles.pumpField}>
              <Text>{pump}:</Text>
              <Text>Runs: {getAnswerByText(`${pump}Runs`)}</Text>
              <Text>Amps: {getAnswerByText(`${pump}Amps`)}</Text>
              <Text>Contactors: {getAnswerByText(`${pump}Contactors`)}</Text>
            </View>
          ))}
        </View>

        {/* Float Scores Section */}
        <View style={styles.floatScoreSection}>
          {["float1", "float2", "float3", "float4", "float5", "float6", "alarmFloat"].map((floatName, index) => (
            <View key={index} style={styles.scoreRow}>
              <Text style={styles.fieldLabel}>{floatName.replace("float", "Float ")}:</Text>
              <Text>{getAnswerByText(floatName)}</Text>
            </View>
          ))}
        </View>

        {/* Cleaning and Tech Note Section */}
        <View style={styles.scoreSection}>
          <View style={styles.scoreRow}>
            <Text>Station Needs Cleaning: </Text>
            <Text>{getAnswerByText("stationNeedsCleaning") === "Yes" ? "Yes" : "No"}</Text>
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
            <Text>{currentDate}</Text>
          </View>
          <View style={styles.footerRow}>
            <Text>Completed By: {data.assignedTo.username || "N/A"}</Text>
            <Text>Inspection ID: {data.id || "N/A"}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDocument;
