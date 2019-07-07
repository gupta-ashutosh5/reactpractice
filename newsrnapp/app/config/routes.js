import React from 'react';
import { AppLoading } from 'expo';
import { Text } from 'react-native';

import { Scene, Router, Stack } from 'react-native-router-flux';

import Home from '../modules/home/scenes/Home';
import Article from '../modules/home/scenes/Article';
import Source from '../modules/home/scenes/Source';

import { color, navTitleStyle } from "../styles/theme";

const TabIcon = ({ selected, title }) => {
  return (
    <Text
      title = {title}
      style={{color: selected ? 'red' :'black'}}
    />
  );
};

export default class extends React.Component {

  render() {
    return (
        <Router>
          <Stack key="root"
                 navigationBarStyle={{backgroundColor: "#fff"}}
                 titleStyle={navTitleStyle}
                 backButtonTintColor={color.black}
          >
            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#000' }}
              hideNavBar
            >
              {/* Tab and it's scenes */}
              <Scene key='ind' title="India" component={Home} icon={TabIcon} area="in" initial>
                <Scene key="aus"
                       component={Home}
                       title="Australia"
                       area="au"
                />
                <Scene
                  key="usa"
                  component={Home}
                  title="usa"
                  area="us"
                />
              </Scene>
              <Scene key="aus" title="Australia" component={Home} icon={TabIcon} area="au" >
                <Scene key="ind"
                       component={Home}
                       title="India"
                       area="in"
                />
                <Scene
                  key="usa"
                  component={Home}
                  title="United States"
                  area="us"
                />
              </Scene>
              <Scene key="usa" title="United States" component={Home} icon={TabIcon} area="us" >
                <Scene key="ind"
                       component={Home}
                       title="India"
                       area="ind"
                />
                <Scene
                  key="aus"
                  component={Home}
                  title="Australia"
                  area="au"
                />
              </Scene>
            </Scene>
            <Scene key="Article" component={Article} title=""/>
            <Scene key="Source" component={Source} title=""/>
          </Stack>
        </Router>
    )
  }
}
