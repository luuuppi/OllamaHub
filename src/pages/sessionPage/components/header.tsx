import DeleteSessionDialog from "@/features/deleteSessionDialog";
import Button from "@/ui/button";
import { Trash2 } from "lucide-react";
import { type FC, useState } from "react";

type HeaderProps = {
  name: string;
  id: string;
};

const Header: FC<HeaderProps> = ({ name, id }) => {
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <header className="flex justify-between border-b border-night-500 px-5 py-4">
      <span>{name === "" ? id : name}</span>
      <Button variant="tertiary" size="icon_xs" onClick={() => setDeleteOpen((prev) => !prev)}>
        <Trash2 size={20} />
      </Button>
      <DeleteSessionDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        sessionId={id}
        sessionName={name}
      />
    </header>
  );
};

export default Header;
