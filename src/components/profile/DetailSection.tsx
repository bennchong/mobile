import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes, { string } from "prop-types";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

const styles = StyleSheet.create({
    headerContainer: {
        marginHorizontal: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#A9A9A9"
    },
    header: { color: "#808080", fontWeight: "bold", fontSize: 15 }
});

interface DetailSectionProps {
    title: string;
    children: any;
}

const DetailSectionHeader = ({ title }) => {
    if (title) {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.header}>{title}</Text>
            </View>);
    }
    else return null;
}

export const DetailSection = (props: DetailSectionProps) => {

    return (
        <View>
            <DetailSectionHeader title={props.title} />
            {props.children}
        </View>
    );
};

