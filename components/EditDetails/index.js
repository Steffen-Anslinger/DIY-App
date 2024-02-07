import React from "react";
import ProjectDetails from "../ProjectDetails";
import EditForm from "../EditForm";
import StyledButton from "../Design/StyledButtons";
import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { useSession } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";
import color from "@/utils/Colors";
import Link from "next/link";

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

const StyledLink = styled(Link)`
  background-color: ${color.grey[200]};
  color: ${color.grey[950]};
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin-right: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${color.blue[300]};
  }
`;

export default function EditDetails({
  isFavourite,
  onToggleFavourite,
  favourites,
  project,
  theme,
}) {
  const [editMode, setEditMode] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  async function handleDeleteProject() {
    if (window.confirm("Are you sure you want to delete this project?")) {
      await fetch(`/api/projects/${id}`, { method: "DELETE" });

      const response = await fetch("/api/projects");
      if (response.ok) {
        mutate("/api/projects");
        router.push("/");
      }
      if (!response.ok) {
        response.status(404).json({ status: "Could not be deleted" });
      }
    }
  }

  return (
    <>
      {editMode ? (
        <EditForm
          theme={theme}
          project={project}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      ) : (
        <>
          <ProjectDetails
            theme={theme}
            project={project}
            onToggleFavourite={onToggleFavourite}
            isFavourite={isFavourite}
            favourites={favourites}
          />
          <StyledButtons>
            <StyledLink href="/">
              <Image
                src={
                  "/assets/keyboard_backspace_FILL0_wght400_GRAD0_opsz24.svg"
                }
                alt="Back Button"
                width={25}
                height={25}
              />
            </StyledLink>
            {session && (
              <>
                <StyledButton
                  type="button"
                  name="icon-blue"
                  onClick={() => setEditMode(true)}
                >
                  <Image
                    src={"/assets/edit_note_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Edit Button"
                    width={25}
                    height={25}
                  />
                </StyledButton>

                <StyledButton
                  type="button"
                  name="icon-red"
                  onClick={handleDeleteProject}
                >
                  <Image
                    src={"/assets/delete_FILL0_wght400_GRAD0_opsz24.svg"}
                    alt="Delete Button"
                    width={25}
                    height={25}
                  />
                </StyledButton>
              </>
            )}
          </StyledButtons>
        </>
      )}
    </>
  );
}
