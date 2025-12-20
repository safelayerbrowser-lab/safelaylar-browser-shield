import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const SettingsBar = () => {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-md rounded-full border border-border/50 p-1.5 shadow-lg">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
};

export default SettingsBar;
