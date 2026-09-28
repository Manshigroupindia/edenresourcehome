import { useState, useEffect, useCallback } from 'react';
import { type TeamMember } from '../types/team';
import { getTeamMembers } from '../services/teamService';

interface UseTeamResult {
  team: TeamMember[];
  loading: boolean;
  error: string | null;
  refreshTeam: () => Promise<void>;
}

export function useTeam(includeInactive: boolean = false): UseTeamResult {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTeamMembers(includeInactive);
      setTeam(data);
    } catch (err: unknown) {
      console.warn('Error fetching team members:', err);
      setError('Could not load team members from server.');
    } finally {
      setLoading(false);
    }
  }, [includeInactive]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getTeamMembers(includeInactive);
        if (mounted) {
          setTeam(data);
        }
      } catch (err: unknown) {
        if (mounted) {
          console.warn('Error in useTeam initial fetch:', err);
          setError('Could not load team members from server.');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, [includeInactive]);

  return {
    team,
    loading,
    error,
    refreshTeam: fetchTeam
  };
}
