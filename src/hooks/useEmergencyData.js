import { useMemo, useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';

/**
 * Custom Hook: useEmergencyData
 * Natural academic demonstration of ES6+ Array Methods: map(), filter(), find(), sort().
 */
export function useEmergencyData() {
  const { emergencies, hospitals, ambulances, stats } = useEmergency();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('reportedTime'); // reportedTime, priority, sector

  // Filtered & Sorted Emergency History
  const filteredEmergencies = useMemo(() => {
    return emergencies
      .filter(item => {
        const matchesSearch = 
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.reporterName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;

        return matchesSearch && matchesPriority && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          const priorityWeight = { Critical: 3, High: 2, Medium: 1, Low: 0 };
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        if (sortBy === 'sector') {
          return a.sector.localeCompare(b.sector);
        }
        // Default sort by reportedTime (newest first)
        return new Date(b.reportedTime).getTime() - new Date(a.reportedTime).getTime();
      });
  }, [emergencies, searchQuery, priorityFilter, statusFilter, sortBy]);

  // Helper method: Find single emergency by ID using find()
  const findEmergencyById = (id) => {
    return emergencies.find(item => item.id === id);
  };

  return {
    emergencies: filteredEmergencies,
    allEmergencies: emergencies,
    hospitals,
    ambulances,
    stats,
    searchQuery,
    setSearchQuery,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    findEmergencyById
  };
}
