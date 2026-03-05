import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Plus, Trash2, Tag, FileText, X } from "lucide-react";

interface Folder {
  id: number;
  name: string;
  color: string;
  tags: string[];
  files: string[];
}

const COLORS = [
  "hsl(9,70%,54%)",
  "hsl(185,48%,50%)",
  "hsl(265,60%,60%)",
  "hsl(142,60%,50%)",
  "hsl(34,60%,55%)",
];

const initialFolders: Folder[] = [
  {
    id: 1,
    name: "Physics",
    color: COLORS[0],
    tags: ["mechanics", "waves"],
    files: ["Chapter1.pdf", "Notes_lec2.txt"],
  },
  {
    id: 2,
    name: "Mathematics",
    color: COLORS[1],
    tags: ["calculus", "algebra"],
    files: ["Calculus_Summary.pdf"],
  },
  {
    id: 3,
    name: "Biology",
    color: COLORS[3],
    tags: ["cells", "genetics"],
    files: ["Cell_Structure.png", "DNA_Notes.txt"],
  },
];

const FoldersPage = () => {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [selected, setSelected] = useState<Folder | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState("");
  const [newColor, setNewColor] = useState(COLORS[0]);
  const [newTag, setNewTag] = useState("");

  const createFolder = () => {
    if (!newName.trim()) return;
    setFolders((f) => [
      ...f,
      { id: Date.now(), name: newName, color: newColor, tags: [], files: [] },
    ]);
    setNewName("");
    setShowNew(false);
  };

  const addTag = (folderId: number) => {
    if (!newTag.trim()) return;
    setFolders((f) =>
      f.map((folder) =>
        folder.id === folderId
          ? { ...folder, tags: [...folder.tags, newTag] }
          : folder,
      ),
    );
    if (selected?.id === folderId)
      setSelected((f) => (f ? { ...f, tags: [...f.tags, newTag] } : f));
    setNewTag("");
  };

  const removeTag = (folderId: number, tag: string) => {
    setFolders((f) =>
      f.map((folder) =>
        folder.id === folderId
          ? { ...folder, tags: folder.tags.filter((t) => t !== tag) }
          : folder,
      ),
    );
    if (selected?.id === folderId)
      setSelected((f) =>
        f ? { ...f, tags: f.tags.filter((t) => t !== tag) } : f,
      );
  };

  const deleteFolder = (id: number) => {
    setFolders((f) => f.filter((folder) => folder.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6 md:mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-serif font-bold text-[hsl(36,28%,93%)] text-2xl md:text-3xl mb-1">
            Subject Folders
          </h1>
          <p className="text-[hsl(36,15%,58%)] text-sm">
            Organize your notes by subject and tag.
          </p>
        </div>
        <button
          onClick={() => setShowNew(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white"
          style={{ backgroundColor: "hsl(9,70%,54%)" }}
        >
          <Plus size={15} /> New Folder
        </button>
      </div>

      {/* New folder form */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 rounded-2xl p-5 border border-[hsla(36,25%,90%,0.1)]"
            style={{ backgroundColor: "hsla(210,50%,24%,0.6)" }}
          >
            <p className="font-semibold text-[hsl(36,25%,80%)] mb-4 text-sm">
              New Folder
            </p>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Folder name (e.g. Chemistry)"
              className="w-full mb-4 px-4 py-3 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,44%)] text-sm outline-none focus:border-[hsl(185,48%,50%)]"
            />
            <div className="flex gap-2 mb-4 flex-wrap">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setNewColor(c)}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${newColor === c ? "border-white scale-110" : "border-transparent"}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={createFolder}
                className="px-4 py-2 rounded-xl bg-[hsl(9,70%,54%)] text-white text-sm font-semibold"
              >
                Create
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="px-4 py-2 rounded-xl text-[hsl(36,15%,55%)] text-sm hover:text-white"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Folder Grid */}
        <div
          className={`${selected ? "md:col-span-1" : "md:col-span-3"} grid grid-cols-1 ${!selected ? "sm:grid-cols-2 lg:grid-cols-3" : ""} gap-3 content-start`}
        >
          {folders.map((folder) => (
            <motion.div
              key={folder.id}
              layout
              onClick={() =>
                setSelected(selected?.id === folder.id ? null : folder)
              }
              className={`rounded-2xl p-4 border cursor-pointer transition-all ${selected?.id === folder.id ? "border-white/20" : "border-[hsla(36,25%,90%,0.07)] hover:border-[hsla(36,25%,90%,0.18)]"}`}
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
              whileHover={{ y: -3 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: folder.color + "29" }}
                >
                  <FolderOpen size={18} style={{ color: folder.color }} />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFolder(folder.id);
                  }}
                  className="text-[hsl(36,15%,40%)] hover:text-[hsl(9,70%,65%)] transition-colors p-1"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              <p className="font-semibold text-[hsl(36,25%,88%)] mb-1">
                {folder.name}
              </p>
              <p className="text-[hsl(36,15%,50%)] text-xs mb-3">
                {folder.files.length} files
              </p>
              <div className="flex flex-wrap gap-1.5">
                {folder.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                    style={{
                      backgroundColor: folder.color + "22",
                      color: folder.color,
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="md:col-span-2 rounded-2xl p-5 border border-[hsla(36,25%,90%,0.08)]"
              style={{ backgroundColor: "hsla(210,50%,24%,0.5)" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: selected.color + "29" }}
                  >
                    <FolderOpen size={18} style={{ color: selected.color }} />
                  </div>
                  <p className="font-semibold text-[hsl(36,25%,88%)] text-lg">
                    {selected.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[hsl(36,15%,50%)] hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Files */}
              <p className="text-[hsl(36,20%,60%)] text-xs font-semibold uppercase tracking-wider mb-3">
                Files
              </p>
              <div className="flex flex-col gap-2 mb-5">
                {selected.files.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[hsla(210,50%,18%,0.5)]"
                  >
                    <FileText size={15} className="text-[hsl(36,15%,55%)]" />
                    <span className="text-[hsl(36,25%,82%)] text-sm">{f}</span>
                  </div>
                ))}
                {selected.files.length === 0 && (
                  <p className="text-[hsl(36,15%,40%)] text-sm">
                    No files yet.
                  </p>
                )}
              </div>

              {/* Tags */}
              <p className="text-[hsl(36,20%,60%)] text-xs font-semibold uppercase tracking-wider mb-3">
                Tags
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      backgroundColor: selected.color + "22",
                      color: selected.color,
                    }}
                    onClick={() => removeTag(selected.id, t)}
                  >
                    <Tag size={10} /> #{t} <X size={10} />
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTag(selected.id)}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[hsla(210,50%,18%,0.8)] text-[hsl(36,25%,88%)] border border-[hsla(36,25%,90%,0.1)] placeholder-[hsl(36,15%,40%)] text-sm outline-none"
                />
                <button
                  onClick={() => addTag(selected.id)}
                  className="px-3 py-2 rounded-xl text-white text-sm font-semibold"
                  style={{ backgroundColor: selected.color }}
                >
                  Add
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FoldersPage;
