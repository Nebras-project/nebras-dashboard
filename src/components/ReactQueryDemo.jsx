import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  Typography, 
  Stack, 
  Button, 
  CircularProgress, 
  Alert,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { FiRefreshCw, FiDatabase, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

/**
 * Mock API Functions
 * These simulate API calls for demonstration purposes
 */

// Simulate fetching users
const fetchUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return [
    { id: 1, name: 'أحمد محمد', role: 'owner', email: 'ahmed@nebras.com' },
    { id: 2, name: 'فاطمة علي', role: 'general_admin', email: 'fatima@nebras.com' },
    { id: 3, name: 'محمد حسن', role: 'curriculum_manager', email: 'mohamed@nebras.com' },
    { id: 4, name: 'سارة خالد', role: 'content_manager', email: 'sara@nebras.com' },
  ];
};

// Simulate fetching statistics
const fetchStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  return {
    totalUsers: 156,
    totalStudents: 1240,
    totalQuestions: 3567,
    totalCompetitions: 12,
  };
};

// Simulate adding a user (mutation)
const addUser = async (newUser) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
  return { id: Date.now(), ...newUser };
};

/**
 * ReactQueryDemo Component
 * Demonstrates React Query features including queries, mutations, and caching
 */
const ReactQueryDemo = () => {
  const queryClient = useQueryClient();
  const [mutationCount, setMutationCount] = useState(0);

  // Query 1: Fetch Users
  const { 
    data: users, 
    isLoading: usersLoading, 
    isError: usersError,
    error: usersErrorObj,
    refetch: refetchUsers,
    isFetching: usersFetching
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Query 2: Fetch Statistics
  const { 
    data: stats, 
    isLoading: statsLoading, 
    isError: statsError,
    refetch: refetchStats,
    isFetching: statsFetching
  } = useQuery({
    queryKey: ['statistics'],
    queryFn: fetchStats,
  });

  // Mutation: Add User
  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // Invalidate and refetch users query after successful mutation
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setMutationCount(prev => prev + 1);
    },
  });

  // Handle adding a new user
  const handleAddUser = () => {
    addUserMutation.mutate({
      name: `User ${mutationCount + 1}`,
      role: 'content_manager',
      email: `user${mutationCount + 1}@nebras.com`,
    });
  };

  // Clear all cache
  const handleClearCache = () => {
    queryClient.clear();
  };

  return (
    <Card>
      <CardContent>
        <Stack spacing={3}>
          {/* Header */}
          <Box>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiDatabase /> React Query Demo
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Demonstrating queries, mutations, caching, and refetching
            </Typography>
          </Box>

          <Divider />

          {/* Control Buttons */}
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button 
              variant="outlined" 
              startIcon={<FiRefreshCw />}
              onClick={() => {
                refetchUsers();
                refetchStats();
              }}
              disabled={usersFetching || statsFetching}
            >
              Refetch All
            </Button>
            <Button 
              variant="contained" 
              onClick={handleAddUser}
              disabled={addUserMutation.isPending}
            >
              {addUserMutation.isPending ? 'Adding...' : 'Add User (Mutation)'}
            </Button>
            <Button 
              variant="outlined" 
              color="error"
              onClick={handleClearCache}
            >
              Clear Cache
            </Button>
          </Stack>

          {/* Mutation Status */}
          {addUserMutation.isSuccess && (
            <Alert severity="success" icon={<FiCheckCircle />}>
              User added successfully! Cache invalidated and users refetched automatically.
            </Alert>
          )}
          {addUserMutation.isError && (
            <Alert severity="error" icon={<FiAlertCircle />}>
              Error adding user: {addUserMutation.error?.message}
            </Alert>
          )}

          <Divider />

          {/* Query 1: Users List */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Users Query</Typography>
              {usersFetching && <CircularProgress size={20} />}
              {users && <Chip label={`Cached: ${users.length} users`} size="small" color="success" />}
            </Stack>

            {usersLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            )}

            {usersError && (
              <Alert severity="error">
                Error loading users: {usersErrorObj?.message}
              </Alert>
            )}

            {users && (
              <Stack spacing={1}>
                {users.map((user) => (
                  <Box 
                    key={user.id} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'background.surface.level1', 
                      borderRadius: 1,
                      border: 1,
                      borderColor: 'divider'
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="body1" fontWeight="medium">
                          {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.email}
                        </Typography>
                      </Box>
                      <Chip label={user.role.replace('_', ' ')} size="small" />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>

          <Divider />

          {/* Query 2: Statistics */}
          <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h6">Statistics Query</Typography>
              {statsFetching && <CircularProgress size={20} />}
              {stats && <Chip label="Cached" size="small" color="success" />}
            </Stack>

            {statsLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress />
              </Box>
            )}

            {statsError && (
              <Alert severity="error">
                Error loading statistics
              </Alert>
            )}

            {stats && (
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText', borderRadius: 1, minWidth: 120 }}>
                  <Typography variant="h4">{stats.totalUsers}</Typography>
                  <Typography variant="body2">Total Users</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText', borderRadius: 1, minWidth: 120 }}>
                  <Typography variant="h4">{stats.totalStudents}</Typography>
                  <Typography variant="body2">Students</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'success.main', color: 'success.contrastText', borderRadius: 1, minWidth: 120 }}>
                  <Typography variant="h4">{stats.totalQuestions}</Typography>
                  <Typography variant="body2">Questions</Typography>
                </Box>
                <Box sx={{ p: 2, bgcolor: 'info.main', color: 'info.contrastText', borderRadius: 1, minWidth: 120 }}>
                  <Typography variant="h4">{stats.totalCompetitions}</Typography>
                  <Typography variant="body2">Competitions</Typography>
                </Box>
              </Stack>
            )}
          </Box>

          {/* Features List */}
          <Box sx={{ bgcolor: 'background.primary', p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">
              ✨ React Query Features Demonstrated:
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="body2">✅ Automatic caching with staleTime (5 minutes)</Typography>
              <Typography variant="body2">✅ Background refetching on user interaction</Typography>
              <Typography variant="body2">✅ Mutations with automatic cache invalidation</Typography>
              <Typography variant="body2">✅ Loading and error states</Typography>
              <Typography variant="body2">✅ Query devtools (bottom-right corner)</Typography>
              <Typography variant="body2">✅ Retry logic for failed requests</Typography>
              <Typography variant="body2">✅ Garbage collection after 10 minutes</Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ReactQueryDemo;

