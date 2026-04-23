import type { Metadata } from "next";

const travelStyles = [
  { id: "luxury", label: "Luxury", icon: <IconDiamond /> },
  { id: "adventure", label: "Adventure", icon: <IconHiker /> },
  { id: "culture", label: "Culture", icon: <IconTemple /> },
  { id: "culinary", label: "Culinary", icon: <IconForkKnife /> },
] as const;

const settingsSections = [
  { id: "profile", label: "Profile", icon: <IconUser /> },
  { id: "account", label: "Account", icon: <IconUserCog /> },
  { id: "notifications", label: "Notifications", icon: <IconBell /> },
  { id: "appearance", label: "Appearance", icon: <IconPalette /> },
] as const;

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your profile and travel preferences.",
};

export default function SettingsPage() {
  return (
    <div className="mt-8 grid gap-7 lg:grid-cols-[220px_1fr]">
      <aside>
        <h1 className="text-5xl font-black tracking-[-0.02em] text-[#1f2730]">Settings</h1>

        <nav className="mt-6 space-y-1" aria-label="Settings sections">
          {settingsSections.map((section) => {
            const isActive = section.id === "profile";

            return (
              <button
                key={section.id}
                type="button"
                className={isActive
                  ? "flex w-full items-center gap-3 rounded-xl bg-[#e7edf2] px-4 py-3 text-left text-lg font-semibold text-[#14445a]"
                  : "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-lg font-medium text-[#606f79] transition hover:bg-[#eef3f6]"}
              >
                {section.icon}
                {section.label}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="rounded-4xl border border-[#e2e8ed] bg-white px-6 py-7 shadow-[0_18px_55px_rgba(31,52,63,0.08)] sm:px-8 sm:py-9">
        <h2 className="text-4xl font-bold tracking-[-0.02em] text-[#212b33]">Profile Details</h2>

        <div className="mt-7 flex flex-wrap items-center gap-5">
          <div className="size-24 overflow-hidden rounded-full bg-[#64a9a1] ring-2 ring-white shadow-[0_8px_18px_rgba(11,55,65,0.18)]">
            <div className="flex h-full items-center justify-center text-4xl">🧑</div>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              className="rounded-full bg-[#04526d] px-6 py-2 text-sm font-semibold text-white shadow-[0_12px_20px_rgba(5,82,109,0.27)] transition hover:bg-[#03465c]"
            >
              Change Photo
            </button>
            <button type="button" className="block px-3 text-sm font-semibold text-[#6a7882] transition hover:text-[#364550]">
              Remove
            </button>
          </div>
        </div>

        <form className="mt-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#667580]">First Name</span>
              <input
                type="text"
                defaultValue="Elena"
                className="mt-2 h-12 w-full rounded-xl border border-[#e1e7ec] bg-[#fbfcfd] px-4 text-lg text-[#2a353e] outline-none transition focus:border-[#8caebf]"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#667580]">Last Name</span>
              <input
                type="text"
                defaultValue="Rostova"
                className="mt-2 h-12 w-full rounded-xl border border-[#e1e7ec] bg-[#fbfcfd] px-4 text-lg text-[#2a353e] outline-none transition focus:border-[#8caebf]"
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-bold uppercase tracking-[0.08em] text-[#667580]">Bio</span>
            <textarea
              defaultValue="Digital nomad and architecture enthusiast. Always searching for the perfect espresso."
              rows={4}
              className="mt-2 w-full resize-none rounded-xl border border-[#e1e7ec] bg-[#fbfcfd] px-4 py-3 text-lg text-[#2a353e] outline-none transition focus:border-[#8caebf]"
            />
          </label>

          <div className="mt-7">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-[#667580]">Preferred Travel Style</p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {travelStyles.map((style) => {
                const isActive = style.id === "luxury";

                return (
                  <button
                    key={style.id}
                    type="button"
                    className={isActive
                      ? "flex h-20 items-center justify-center gap-2 rounded-2xl border border-[#4d8ca8] bg-[#eaf3f9] text-lg font-semibold text-[#1e4f66]"
                      : "flex h-20 items-center justify-center gap-2 rounded-2xl border border-[#edf1f5] bg-[#f6f8fa] text-lg font-medium text-[#5e6b75] transition hover:border-[#cad7e1]"}
                  >
                    {style.icon}
                    {style.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-9 flex items-center justify-end gap-4 border-t border-[#eff3f6] pt-6">
            <button type="button" className="px-4 py-2 text-xl font-semibold text-[#3d6276] transition hover:text-[#274654]">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#04526d] px-8 py-3 text-xl font-semibold text-white shadow-[0_13px_24px_rgba(6,84,112,0.28)] transition hover:bg-[#03465c]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function IconUser() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function IconUserCog() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="3" />
      <path d="M2.5 18a5.5 5.5 0 0 1 11 0" />
      <circle cx="17.5" cy="15.5" r="2.5" />
      <path d="M17.5 12.5v1M17.5 17.5v1M20.5 15.5h-1M15.5 15.5h-1" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 9a6 6 0 1 1 12 0c0 7 3 7 3 9H3c0-2 3-2 3-9" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

function IconPalette() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3a9 9 0 0 0 0 18h1.4a2.6 2.6 0 0 0 0-5.2H12a1.8 1.8 0 1 1 0-3.6h4.8A4.2 4.2 0 0 0 21 8a5 5 0 0 0-5-5Z" />
      <circle cx="7.5" cy="9" r="1" />
      <circle cx="10" cy="6.8" r="1" />
      <circle cx="14" cy="6.5" r="1" />
    </svg>
  );
}

function IconDiamond() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m4 10 4-5h8l4 5-8 9-8-9Z" />
      <path d="M8 5l4 14 4-14" />
      <path d="M4 10h16" />
    </svg>
  );
}

function IconHiker() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10" cy="5.5" r="2" />
      <path d="m10 8.5-2 4 2 2-1.5 5" />
      <path d="m10 12 3 2 2 6" />
      <path d="M14 7.5 12 11" />
      <path d="M18 4v16" />
    </svg>
  );
}

function IconTemple() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9h18" />
      <path d="M5 9v8M9 9v8M15 9v8M19 9v8" />
      <path d="M2 19h20" />
      <path d="m12 4 9 4H3z" />
    </svg>
  );
}

function IconForkKnife() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 3v9" />
      <path d="M4.5 3v5.5a2.5 2.5 0 0 0 5 0V3" />
      <path d="M7 12v9" />
      <path d="M15 3v18" />
      <path d="M15 3a3 3 0 0 1 3 3v4h-3" />
    </svg>
  );
}
