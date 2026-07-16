import { useState } from "react";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="layout">
      <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <button
          className="toggle-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          ☰
        </button>

        <ul>
          <li>
            <span className="icon">🏠</span>
            {!isCollapsed && <span>Home</span>}
          </li>

          <li>
            <span className="icon">💬</span>
            {!isCollapsed && <span>Chat</span>}
          </li>

          <li>
            <span className="icon">⚙️</span>
            {!isCollapsed && <span>Settings</span>}
          </li>
        </ul>
      </aside>

    </div>
  );
}

export default SideBar;