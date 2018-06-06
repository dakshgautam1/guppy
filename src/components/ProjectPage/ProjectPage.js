// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getSelectedProject } from '../../reducers/projects.reducer';
import { extractProjectTabFromUrl } from '../../services/location.service';
import { COLORS } from '../../constants';

import MainContentWrapper from '../MainContentWrapper';
import Heading from '../Heading';
import PixelShifter from '../PixelShifter';
import Spacer from '../Spacer';
import DevelopmentServerPane from '../DevelopmentServerPane';
import TaskRunnerPane from '../TaskRunnerPane';
import DependencyManagementPane from '../DependencyManagementPane';

import type { Action } from 'redux';
import type { Project } from '../../types';

type Props = {
  project: Project,
  selectProject: Action,
  location: any, // provided by react-router
  match: any, // provided by react-router
};

class ProjectPage extends Component<Props> {
  render() {
    const { project, location, match } = this.props;

    const projectIdFromUrl = match.params.projectId;
    const projectTabFromUrl = extractProjectTabFromUrl(location) || 'tasks';

    if (!project) {
      return null;
    }

    return (
      <MainContentWrapper>
        <Header>
          <PixelShifter x={-2}>
            <Heading size="xlarge" style={{ color: COLORS.purple[500] }}>
              {project.name}
            </Heading>
          </PixelShifter>
        </Header>

        <Spacer size={30} />

        <DevelopmentServerPane leftSideWidth={300} />

        <Spacer size={30} />

        <TaskRunnerPane leftSideWidth={200} />
        <Spacer size={30} />
        <DependencyManagementPane />
      </MainContentWrapper>
    );
  }
}

const Header = styled.div`
  /* padding: 0 10px; */
`;

const mapStateToProps = state => ({
  project: getSelectedProject(state),
});

export default connect(mapStateToProps)(ProjectPage);