import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import { MdArrowBack, MdPeople } from 'react-icons/md';

function CompetitionMembersPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock members data
  const members = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed@example.com', status: 'Completed', score: 85 },
    { id: 2, name: 'Fatima Hassan', email: 'fatima@example.com', status: 'In Progress', score: null },
    { id: 3, name: 'Mohammed Saeed', email: 'mohammed@example.com', status: 'Completed', score: 92 },
    { id: 4, name: 'Sarah Ahmad', email: 'sarah@example.com', status: 'Not Started', score: null },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {/* Back Button */}
        <Button
          startIcon={<MdArrowBack />}
          onClick={() => navigate(`/competitions/${id}`)}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Competition
        </Button>

        {/* Page Header */}
        <Box>
          <Typography variant="h3" gutterBottom color="primary">
            <MdPeople style={{ verticalAlign: 'middle', marginInlineEnd: 8 }} />
            Competition Members
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Total Participants: {members.length}
          </Typography>
        </Box>

        {/* Members List */}
        <Stack spacing={2}>
          {members.map((member) => (
            <Card key={member.id}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {member.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{member.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.email}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'end' }}>
                    <Chip
                      label={member.status}
                      size="small"
                      color={
                        member.status === 'Completed'
                          ? 'success'
                          : member.status === 'In Progress'
                          ? 'info'
                          : 'default'
                      }
                    />
                    {member.score && (
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        Score: {member.score}%
                      </Typography>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

export default CompetitionMembersPage;

