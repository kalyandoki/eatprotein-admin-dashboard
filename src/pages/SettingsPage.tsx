import React from "react";
import Card from "../components/ui/Card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectUi,
  toggleDarkMode,
  setSidebarCollapsed,
} from "../store/slices/uiSlice";

export default function SettingsPage() {
  const dispatch = useAppDispatch();
  const ui = useAppSelector(selectUi);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Settings</h2>
        <p className="text-sm text-gray-600">Application preferences</p>
      </div>

      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Dark mode</div>
              <div className="text-sm text-gray-500">Switch theme</div>
            </div>
            <div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ui.darkMode}
                  onChange={() => dispatch(toggleDarkMode())}
                />
                <span className="text-sm">Enabled</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Collapse sidebar</div>
              <div className="text-sm text-gray-500">
                Compact sidebar for more space
              </div>
            </div>
            <div>
              <label className="inline-flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={ui.sidebarCollapsed}
                  onChange={() =>
                    dispatch(setSidebarCollapsed(!ui.sidebarCollapsed))
                  }
                />
                <span className="text-sm">Yes</span>
              </label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
