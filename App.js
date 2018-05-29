import React from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';

import { Constants } from 'expo';

const token = '';
const getDeployments = 'https://api.zeit.co/v2/now/deployments';
const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
};

export default class FetchExample extends React.Component {
  state = {
    isLoading: true,
    dataSource: null,
  };

  _loadDeploymentsAsync = async () => {
    const res = await fetch(getDeployments, { headers });

    const { deployments } = await res.json();

    const payload = await this.setState({
      isLoading: false,
      dataSource: deployments,
    });
  };

  componentDidMount() {
    this._loadDeploymentsAsync();
  }

  //Task: get openURL working
  // onPress = () => {
  //   Linking.openURL();
  // };

  _onPress = () => {
    Alert.alert('Button pressed!', 'You did it!');
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
          data={this.state.dataSource}
          renderItem={({ item, separators }) =>
            console.log(separators) ||
            <TouchableOpacity _onPress={() => this._onPress(item.url)}>
              
              <View style={{ backgroundColor: 'mistyrose' }}>
                
                <View>
                  <Text style={{ fontWeight: 'bold', fontSize: 24 }}>
                    {item.name}
                    {' '}
                  </Text>
                </View>
                
               <View>
                  <Text>
                    {'URL: '}
                    {item.url}
                    {' '}
                  </Text>
                </View>

                <View>
                  <Text>
                    {'\t'}
                    {item.state}
                    {' '}
                  </Text>
                </View>

                <View>
                  <Text>
                    {'\t'}
                    {item.type} {' '}
                  </Text>
                </View>

                <View>
                  <Text>
                    {'Created At: '}
                    {item.created ? new Date(item.created).toString() : null}
                    {'\n'}
                  </Text>
                </View>

              </View>
            </TouchableOpacity>}
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
