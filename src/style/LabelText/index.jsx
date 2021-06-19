import styled from 'styled-components/native';

const LabelText = styled.Text`
  font-size: ${props => props?.size || 14}px;
  align-items: center;
  text-align: ${props => props?.align || 'center'};
  font-weight: ${props => props?.weight || '400'};
  padding-vertical: ${props => props?.padding || 10}px;
  color: ${props => props?.color || '#121212'};
  text-transform: ${props => props?.transform || 'none'};
`;

export default LabelText;
