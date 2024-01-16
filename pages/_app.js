import GlobalStyle from "../styles";
import { initialProjects } from "@/lib/data";

import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [projects, setProjects] = useLocalStorageState("projects", {
    defaultValue: initialProjects,
  });

  function handleAddEntry(newEntry) {
    setProjects([...projects, { ...newEntry }]);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        onAddProject={handleAddEntry}
        projects={projects}
      />
    </>
  );
}
