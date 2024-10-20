"use client";

import { deleteSecurityAdvisory } from "@/actions/delete-security-advisory";
import Button from "@/components/button";
import { GenerationRequestResponse } from "@/lib/api/csaf-generator";
import { TrashIcon } from "@heroicons/react/24/outline";

interface DeleteSecurityAdvisoryButtonProps {
  response: GenerationRequestResponse;
}

export default function DeleteSecurityAdvisoryButton({
  response,
}: DeleteSecurityAdvisoryButtonProps) {
  return response.status !== "pending" ? (
    <Button
      className="bg-red-800 hover:bg-red-700"
      onClick={() => {
        const really = confirm(
          "Do you really want to remove this security advisory?",
        );

        if (!really) {
          return;
        }
        deleteSecurityAdvisory(response);
      }}
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  ) : (
    <></>
  );
}
