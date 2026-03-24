"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  action,
  type = "projeto",
  className,
}: {
  action: () => Promise<unknown>;
  type?: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir este(a) ${type}? Esta ação não pode ser desfeita.`,
      )
    ) {
      startTransition(async () => {
        await action();
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      title="Excluir"
      className={
        className ||
        `flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
          isPending
            ? "text-neutral-600 bg-transparent cursor-not-allowed"
            : "text-neutral-400 hover:text-red-400 hover:bg-red-500/20"
        }`
      }
    >
      <Trash2 className="h-3.5 w-3.5" />
      {!className && (isPending ? "Excluindo..." : "Excluir")}
    </button>
  );
}
