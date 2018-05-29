import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import { Constants } from 'expo';

const token = '';

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
};

export default class FetchExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    };
  }

  _loadDeploymentsAsync = async () => {
    const response = await fetch('https://api.zeit.co/v2/now/deployments', {
      headers,
      method: 'GET',
    });

    const payload = await response.json();
    const deployments = await this.setState({
      isLoading: false,
      dataSource: payload,
    });
    // return deployments;
  };

  componentWillMount() {
    this._loadDeploymentsAsync();
  }

  _onPress = () => {
    Alert.alert('Button pressed!', 'You did it!');
    // console.log(this.deployments)
  };
  _keyExtractor = item => item.uid;

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, alignItems: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource.deployments}
          renderItem={({ item, separators }) =>
            console.log(item) ||
            <TouchableHighlight
              onPress={() => this._onPress(item)}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}>
              <View style={{ backgroundColor: 'yellow' }}>
                <View>
                  <Text>
                    {' Name: '}
                    {item.name}
                    {' '}
                  </Text>
                </View>
                <View>

                  <Text>
                    {'  URL: '}
                    {item.url}
                    {' '}
                  </Text>
                </View>
                <View>
                  <Text>
                    {'     '}
                    {item.state}
                    {' '}
                  </Text>
                </View>
                <View>

                  <Text>
                    {'     '}
                    {item.type} {' '}
                  </Text>
                </View>
                <View>

                  <Text>
                    {'  Created At: '}
                    {item.created ? new Date(item.created).toString() : null}
                    {' '}
                    {' '}
                  </Text>
                </View>

              </View>

            </TouchableHighlight>}
          keyExtractor={this._keyExtractor}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
