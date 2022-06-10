import { memo } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, Box } from '@chakra-ui/react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

type Props = {
  description: string;
};
const MovieDescription: React.VFC<Props> = (props) => {
  const { description } = props;

  return (
    <Accordion allowMultiple maxW='640px' margin='0 auto'>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box flex='1' textAlign='left'>
                  概要欄
                </Box>
                {isExpanded ? <FaAngleUp fontSize='12px' /> : <FaAngleDown fontSize='12px' />}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{description}</AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default memo(MovieDescription);
