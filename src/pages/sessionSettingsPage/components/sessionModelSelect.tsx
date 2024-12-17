import ModelSelect from "@/features/modelSelect";
import { useOllamaTags } from "@/pages/settingsPage";
import { useSessionStore } from "@/store/useSessionsStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { type FC } from "react";

type SessionModelSelectProps = {
  id: string;
};

const SessionModelSelect: FC<SessionModelSelectProps> = ({ id }) => {
  const serverStatus = useSettingsStore((state) => state.serverStatus);
  const currentModel =
    useSessionStore((state) => state.sessions.find((session) => session.id === id)?.model) ??
    "";
  const setModel = useSessionStore((state) => state.setSessionModel);
  const { data } = useOllamaTags();

  const handleValueChange = (value: string) => setModel(id, value);

  return (
    <ModelSelect
      label="Chat model"
      serverStatus={serverStatus}
      models={data?.models ?? []}
      currentModel={currentModel}
      onValueChange={handleValueChange}
    />
  );
};

export default SessionModelSelect;