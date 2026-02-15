/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

/* ------------------------- MansoryLayout PropTypes ------------------------ */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const MansoryLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return <Layout variants={container} initial="hidden" animate="show">{children}</Layout>;
};

const Layout = styled(motion.div)`
  margin: 1.5em 0;
  
  
  max-width: auto;
  column-gap: 1.5em;
  @media only screen and (min-width: 1024px) {
    column-count: 2;
  }
  @media only screen and (max-width: 1023px) and (min-width: 768px) {
    column-count: 1;
  }

  @media only screen and (max-width: 767px) and (min-width: 540px) {
    column-count: 1;
  }

  @media (max-width: 585px) {
    opacity: 1 !important;
  }
  @media (max-width: 989px) {
    opacity: 1 !important;
  }
  @media (max-width: 220px) {
    opacity: 1 !important;
  }
`;

export default MansoryLayout;
