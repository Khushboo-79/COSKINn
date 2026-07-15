import { Routes, Route, Navigate } from 'react-router-dom';
import SupportDashboardScreen from './screens/SupportDashboardScreen';
import { TicketsScreen } from './screens/TicketsScreen';
import { LiveChatScreen } from './screens/LiveChatScreen';
import { CustomersScreen } from './screens/CustomersScreen';
import { ReturnsRefundsScreen } from './screens/ReturnsRefundsScreen';
import { FeedbackScreen } from './screens/FeedbackScreen';
import { KnowledgeBaseScreen } from './screens/KnowledgeBaseScreen';
import { CannedResponsesScreen } from './screens/CannedResponsesScreen';
import { SettingsScreen } from './screens/SettingsScreen';

export default function SupportModuleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SupportDashboardScreen />} />
      <Route path="/tickets" element={<TicketsScreen />} />
      <Route path="/chat" element={<LiveChatScreen />} />
      <Route path="/customers" element={<CustomersScreen />} />
      <Route path="/returns" element={<ReturnsRefundsScreen />} />
      <Route path="/feedback" element={<FeedbackScreen />} />
      <Route path="/kb" element={<KnowledgeBaseScreen />} />
      <Route path="/canned-responses" element={<CannedResponsesScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/support" replace />} />
    </Routes>
  );
}
