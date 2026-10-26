import JournalPage from "./JournalPage";
import { electronicsEngineeringInfo } from "./data/journalPages";

export default function ElectronicsEngineeringJournal() {
  return <JournalPage journalInfo={electronicsEngineeringInfo} />;
}
