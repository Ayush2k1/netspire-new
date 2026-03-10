import formatPhoneNumber from "@/utils/formatPhone";
import { Card, Stack, TextInput, Text } from "@sanity/ui";
import React from "react";
import { ObjectInputProps, ObjectSchemaType } from "sanity";

const ContactCustomInput = (
  props: ObjectInputProps<Record<string, any>, ObjectSchemaType>
) => {
  const {
    elementProps: {
      id,
      onBlur,
      onFocus,
      ref,
      // value
    },
    onChange,
    schemaType,
    validation,
    value,
  } = props;

  return (
    <Card padding={4}>
      <Stack space={[3, 3, 4]}>
        <Card padding={[3, 3, 4]} radius={2} shadow={1}>
          <Text align="left" size={[2, 2, 3]}>
            First Name: {value?.firstName || ""}
          </Text>
        </Card>
        <Card padding={[3, 3, 4]} radius={2} shadow={1}>
          <Text align="left" size={[2, 2, 3]}>
            Last Name: {value?.lastName || ""}
          </Text>
        </Card>
        <Card padding={[3, 3, 4]} radius={2} shadow={1}>
          <Text align="left" size={[2, 2, 3]}>
            Email: {value?.email || ""}
          </Text>
        </Card>
        <Card padding={[3, 3, 4]} radius={2} shadow={1}>
          <Text align="left" size={[2, 2, 3]}>
            Phone: {formatPhoneNumber(value?.phone)}
          </Text>
        </Card>
        {value?.subject && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Text align="left" size={[2, 2, 3]}>
              Subject: {value.subject || ""}
            </Text>
          </Card>
        )}
        {value?.message && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Text align="left" size={[2, 2, 3]}>
              Message: {value.message || ""}
            </Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
};

export default ContactCustomInput;
