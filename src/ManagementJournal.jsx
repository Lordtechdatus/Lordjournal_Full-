import JournalPage from "./JournalPage";
import { managementInfo } from "./data/journalPages";

export default function ManagementJournal() {
  return <JournalPage journalInfo={managementInfo} />;
}
