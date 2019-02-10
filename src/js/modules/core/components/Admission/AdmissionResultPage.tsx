import * as React from "react";
import AdmittedPage from "./AdmittedPage";
import PendingPage from "./PendingPage";
import { connect } from "react-redux";

import { ReduxState } from "../../../../reducers";

interface Props {
  isAccepted: boolean;
}

const AdmissionResultPage: React.FunctionComponent<Props> = ({
  isAccepted
}) => {
  if (isAccepted) {
    return <AdmittedPage />;
  }
  return <PendingPage />;
};

const mapStateToProps = (state: ReduxState) => ({
  isAccepted: state.core.isAdmitted
});

export default connect(mapStateToProps)(AdmissionResultPage);
