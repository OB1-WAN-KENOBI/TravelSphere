import { Routes, Route, NavLink } from 'react-router-dom';
import { ProfileInfo } from './ProfileInfo';
import { OrdersHistory } from './OrdersHistory';
import { Documents } from './Documents';
import { Support } from './Support';
import { useTranslation } from '@/shared/lib/useTranslation';
import './ProfilePage.scss';

export function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-page__title">{t.profilePage.title}</h1>
        <div className="profile-page__content">
          <aside className="profile-page__sidebar">
            <nav className="profile-page__nav">
              <NavLink
                to="/profile"
                end
                className={({ isActive }) =>
                  `profile-page__nav-link ${isActive ? 'active' : ''}`
                }
              >
                {t.profilePage.nav.profile}
              </NavLink>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `profile-page__nav-link ${isActive ? 'active' : ''}`
                }
              >
                {t.profilePage.nav.orders}
              </NavLink>
              <NavLink
                to="/profile/documents"
                className={({ isActive }) =>
                  `profile-page__nav-link ${isActive ? 'active' : ''}`
                }
              >
                {t.profilePage.nav.documents}
              </NavLink>
              <NavLink
                to="/profile/support"
                className={({ isActive }) =>
                  `profile-page__nav-link ${isActive ? 'active' : ''}`
                }
              >
                {t.profilePage.nav.support}
              </NavLink>
            </nav>
          </aside>
          <main className="profile-page__main">
            <Routes>
              <Route index element={<ProfileInfo />} />
              <Route path="orders" element={<OrdersHistory />} />
              <Route path="documents" element={<Documents />} />
              <Route path="support" element={<Support />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}
