import React from "react";
import { Button, ButtonSpinner, ButtonText } from "@gluestack-ui/themed";

type ActionButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: "solid" | "outline";
};

export function ActionButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "solid",
}: ActionButtonProps) {
  return (
    <Button
      onPress={onPress}
      size="lg"
      variant={variant}
      action={variant === "solid" ? "primary" : "secondary"}
      isDisabled={disabled || loading}
      className="rounded-2xl"
    >
      {loading ? <ButtonSpinner mr="$2" /> : null}
      <ButtonText>{title}</ButtonText>
    </Button>
  );
}
