import React, { useState } from "react";
import { View } from "react-native";
import { getData } from "@govtechsg/open-attestation";
import { ProfileImage } from "./ProfileImage";
import { ProfileBasicDetails } from "./ProfileBasicDetails";
import { ProfilePassDetails } from "./ProfilePassDetails";
import { VerifyProfile } from "./VerifyProfile";
import { VerifyModal } from "../Modals/VerifyModal";
import { DetailSection } from "./DetailSection";
import { Margin } from "../Layout/Margin";
import { TextRow } from "../Layout/TextRow";
import { formatDate } from "../../services/date";

export const ProfileDetails = ({ cleanDocument }) => {
    const { pass, recipient, employer } = cleanDocument;
    const {
        applicationDate,
        expiryDate,
        issueDate,
        isMultipleJourney,
        type
    } = pass;
    const { name, sector } = employer;

    return (
        <View>
            <DetailSection title="Personal Particulars">
                <TextRow label="Country of Residence" text={recipient.country} />
                <TextRow label="Gender" text="Female" />
                <TextRow label="Date of Birth" text={formatDate(recipient.dob)} />
                <Margin />
            </DetailSection>

            <DetailSection title="Pass Details">
                <TextRow label="Pass Type" text={type} />
                <TextRow label="Pass Expires On" text={formatDate(expiryDate)} />
                <TextRow label="Date of Application" text={formatDate(applicationDate)} />
                <TextRow label="Issued On" text={formatDate(issueDate)} />
                <TextRow label="Employer" text={name} />
                <TextRow label="Sector" text={sector} />
                <TextRow
                    label="Multiple Journey Visa"
                    text={isMultipleJourney ? "Issued" : "Not Issued"}
                />
            </DetailSection>
        </View>

    );
}