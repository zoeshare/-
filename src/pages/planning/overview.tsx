import React from 'react';
import PlanningOverview from '../../components/planning/PlanningOverview';
import Navigation from '../../components/Navigation';

const PlanningOverviewPage: React.FC = () => {
  return (
    <div className="pt-16">
      <Navigation />
      <PlanningOverview />
    </div>
  );
};

export default PlanningOverviewPage; 