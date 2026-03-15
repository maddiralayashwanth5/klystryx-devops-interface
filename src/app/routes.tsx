import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Repositories } from "./pages/Repositories";
import { CodeAnalysis } from "./pages/CodeAnalysis";
import { DeploymentReadiness } from "./pages/DeploymentReadiness";
import { AIFixEngine } from "./pages/AIFixEngine";
import { Deployments } from "./pages/Deployments";
import { Infrastructure } from "./pages/Infrastructure";
import { LogsMonitoring } from "./pages/LogsMonitoring";
import { Settings } from "./pages/Settings";
import { ProfileSettings } from "./pages/ProfileSettings";
import { Preferences } from "./pages/Preferences";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "repositories", Component: Repositories },
      { path: "code-analysis", Component: CodeAnalysis },
      { path: "deployment-readiness", Component: DeploymentReadiness },
      { path: "ai-fix-engine", Component: AIFixEngine },
      { path: "deployments", Component: Deployments },
      { path: "infrastructure", Component: Infrastructure },
      { path: "logs-monitoring", Component: LogsMonitoring },
      { path: "settings", Component: Settings },
      { path: "profile-settings", Component: ProfileSettings },
      { path: "preferences", Component: Preferences },
    ],
  },
]);
