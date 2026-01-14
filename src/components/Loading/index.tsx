

import { Container } from './styled';

interface LoadingProps {
  isLoading: boolean
};

export default function Loading( { isLoading }:LoadingProps) {
  if (!isLoading) return <></>;
  return (
    <Container>
      <div />
      <span>Loading...</span>
    </Container>
  );
}
