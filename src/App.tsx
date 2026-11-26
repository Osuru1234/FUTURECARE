/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CohortModal } from './components/CohortModal';
import { EarlyCareView } from './components/EarlyCareView';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MentorshipHub } from './components/MentorshipHub';
import { NetworkView } from './components/NetworkView';
import { OverviewSection } from './components/OverviewSection';
import { WorkshopsView } from './components/WorkshopsView';
import { INITIAL_COMMUNITY_POSTS } from './data/futurecareData';
import {
  CohortApplication,
  CommunityPost,
  MentorBooking,
  PlatformView,
} from './types/futurecare';

const STORAGE_KEY = 'futurecare_platform_state_v1';

interface PersistedState {
  bookings: MentorBooking[];
  reservedWorkshopIds: string[];
  savedPlaybookIds: string[];
  joinedCircleIds: string[];
  careCoverageAttached: string | null;
  application: CohortApplication | null;
  posts: CommunityPost[];
}

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      return {
        bookings: Array.isArray(parsed.bookings) ? parsed.bookings : [],
        reservedWorkshopIds: Array.isArray(parsed.reservedWorkshopIds)
          ? parsed.reservedWorkshopIds
          : [],
        savedPlaybookIds: Array.isArray(parsed.savedPlaybookIds)
          ? parsed.savedPlaybookIds
          : [],
        joinedCircleIds: Array.isArray(parsed.joinedCircleIds)
          ? parsed.joinedCircleIds
          : [],
        careCoverageAttached:
          typeof parsed.careCoverageAttached === 'string'
            ? parsed.careCoverageAttached
            : null,
        application: parsed.application ?? null,
        posts:
          Array.isArray(parsed.posts) && parsed.posts.length > 0
            ? parsed.posts
            : INITIAL_COMMUNITY_POSTS,
      };
    }
  } catch {
    // Fallback cleanly to defaults if localStorage is unavailable
  }

  return {
    bookings: [],
    reservedWorkshopIds: [],
    savedPlaybookIds: [],
    joinedCircleIds: [],
    careCoverageAttached: null,
    application: null,
    posts: INITIAL_COMMUNITY_POSTS,
  };
}

export default function App() {
  const [activeView, setActiveView] = useState<PlatformView>('overview');
  const [isCohortModalOpen, setIsCohortModalOpen] = useState(false);
  const [state, setState] = useState<PersistedState>(loadInitialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [state]);

  const handleBookMentor = (booking: MentorBooking) => {
    setState((prev) => ({
      ...prev,
      bookings: [
        ...prev.bookings.filter((b) => b.mentorId !== booking.mentorId),
        booking,
      ],
    }));
  };

  const handleRemoveBooking = (mentorId: string) => {
    setState((prev) => ({
      ...prev,
      bookings: prev.bookings.filter((b) => b.mentorId !== mentorId),
    }));
  };

  const handleToggleReserveWorkshop = (workshopId: string) => {
    setState((prev) => {
      const exists = prev.reservedWorkshopIds.includes(workshopId);
      return {
        ...prev,
        reservedWorkshopIds: exists
          ? prev.reservedWorkshopIds.filter((id) => id !== workshopId)
          : [...prev.reservedWorkshopIds, workshopId],
      };
    });
  };

  const handleToggleSavePlaybook = (playbookId: string) => {
    setState((prev) => {
      const exists = prev.savedPlaybookIds.includes(playbookId);
      return {
        ...prev,
        savedPlaybookIds: exists
          ? prev.savedPlaybookIds.filter((id) => id !== playbookId)
          : [...prev.savedPlaybookIds, playbookId],
      };
    });
  };

  const handleToggleJoinCircle = (circleId: string) => {
    setState((prev) => {
      const exists = prev.joinedCircleIds.includes(circleId);
      return {
        ...prev,
        joinedCircleIds: exists
          ? prev.joinedCircleIds.filter((id) => id !== circleId)
          : [...prev.joinedCircleIds, circleId],
      };
    });
  };

  const handleAttachCareCoverage = (summary: string) => {
    setState((prev) => ({
      ...prev,
      careCoverageAttached: summary,
    }));
  };

  const handleAddPost = (post: CommunityPost) => {
    setState((prev) => ({
      ...prev,
      posts: [post, ...prev.posts],
    }));
  };

  const handleSubmitApplication = (application: CohortApplication) => {
    setState((prev) => ({
      ...prev,
      application,
    }));
  };

  const planCount =
    state.bookings.length +
    state.reservedWorkshopIds.length +
    state.savedPlaybookIds.length +
    state.joinedCircleIds.length +
    (state.careCoverageAttached ? 1 : 0);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header
        activeView={activeView}
        onNavigate={setActiveView}
        onOpenCohortModal={() => setIsCohortModalOpen(true)}
        planCount={planCount}
      />

      <main className="flex-1">
        {activeView === 'overview' && (
          <OverviewSection
            onNavigate={setActiveView}
            onOpenCohortModal={() => setIsCohortModalOpen(true)}
          />
        )}

        {activeView === 'mentorship' && (
          <MentorshipHub
            bookings={state.bookings}
            onBookMentor={handleBookMentor}
          />
        )}

        {activeView === 'workshops' && (
          <WorkshopsView
            reservedWorkshopIds={state.reservedWorkshopIds}
            onToggleReserveWorkshop={handleToggleReserveWorkshop}
          />
        )}

        {activeView === 'early-care' && (
          <EarlyCareView
            savedPlaybookIds={state.savedPlaybookIds}
            onToggleSavePlaybook={handleToggleSavePlaybook}
            careCoverageAttached={state.careCoverageAttached}
            onAttachCareCoverage={handleAttachCareCoverage}
          />
        )}

        {activeView === 'network' && (
          <NetworkView
            joinedCircleIds={state.joinedCircleIds}
            onToggleJoinCircle={handleToggleJoinCircle}
            posts={state.posts}
            onAddPost={handleAddPost}
          />
        )}
      </main>

      <Footer
        onNavigate={setActiveView}
        onOpenCohortModal={() => setIsCohortModalOpen(true)}
      />

      <CohortModal
        isOpen={isCohortModalOpen}
        onClose={() => setIsCohortModalOpen(false)}
        application={state.application}
        onSubmitApplication={handleSubmitApplication}
        bookings={state.bookings}
        onRemoveBooking={handleRemoveBooking}
        reservedWorkshopIds={state.reservedWorkshopIds}
        onToggleReserveWorkshop={handleToggleReserveWorkshop}
        savedPlaybookIds={state.savedPlaybookIds}
        onToggleSavePlaybook={handleToggleSavePlaybook}
        joinedCircleIds={state.joinedCircleIds}
        onToggleJoinCircle={handleToggleJoinCircle}
        careCoverageAttached={state.careCoverageAttached}
      />
    </div>
  );
}
