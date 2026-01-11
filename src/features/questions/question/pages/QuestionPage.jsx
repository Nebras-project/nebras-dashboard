// external imports
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

// internal imports
import { PageLayout, Loader, EntityErrorState } from '@components';
import { useTranslation } from '@hooks';
import { NAVIGATION_PATHS } from '@config';
import { useQuestion, useDeleteQuestion } from '../hooks';
import QuestionCard from '../components/QuestionCard';
import QuestionFormDialog from '../components/QuestionFormDialog';

/**
 * QuestionPage Component
 *
 * Single Responsibility: Display question details page
 */
function QuestionPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { question: fetchedQuestion, isLoading, isError } = useQuestion({ questionId: id });
  const { deleteQuestion } = useDeleteQuestion({
    onSuccess: () => {
      // Navigate back to questions list after successful deletion
      navigate(NAVIGATION_PATHS.QUESTIONS.BASE);
    },
  });

  const question = fetchedQuestion;

  if (isLoading) {
    return (
      <PageLayout title={t('questions.questionDetails')}>
        <Loader />
      </PageLayout>
    );
  }

  if (isError && !question) {
    return (
      <PageLayout title={t('questions.questionDetails')} showBackButton>
        <EntityErrorState entityName="questions" />
      </PageLayout>
    );
  }

  return (
    <QuestionFormDialog showAddButton={false}>
      {({ onEdit }) => (
        <PageLayout
          title={t('questions.questionDetails')}
          description={question.text || t('questions.questionNumber', { number: question.id })}
        >
          <Container>
            <QuestionCard
              question={question}
              questionNumber={question.id}
              onEdit={onEdit}
              onDelete={deleteQuestion}
            />
          </Container>
        </PageLayout>
      )}
    </QuestionFormDialog>
  );
}

export default QuestionPage;
