// external imports
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';

// internal imports
import { PageLayout, Loader, EntityErrorState } from '@components';
import { useTranslation } from '@hooks';
import { NAVIGATION_PATHS } from '@config';
import { useQuestion, useDeleteQuestion } from '../question/hooks';
import { QuestionCard, QuestionFormDialog } from '../question';
import dummyQuestions from '../utils/dummyQuestionsData';

/**
 * QuestionPage Component
 *
 * Single Responsibility: Display question details page
 */
function QuestionPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const questionId = parseInt(id, 10);
  const { question: fetchedQuestion, isLoading, isError } = useQuestion({ questionId });
  const { deleteQuestion } = useDeleteQuestion({
    onSuccess: () => {
      // Navigate back to questions list after successful deletion
      navigate(NAVIGATION_PATHS.QUESTIONS.BASE);
    },
  });

  // Use dummy data as fallback for development/preview
  // TODO: Remove this when real API is connected
  const question =
    fetchedQuestion || dummyQuestions.find((q) => q.id === questionId) || dummyQuestions[0];

  if (isLoading) {
    return (
      <PageLayout title={t('questions.questionDetails')} showBackButton>
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
          description={question.question || t('questions.questionNumber', { number: question.id })}
          showBackButton
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
