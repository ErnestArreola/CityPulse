import React from 'react'
import {Text, View, Dimensions, Image, Animated, ScrollView, FlatList} from 'react-native'

import SlidingUpPanel from 'rn-sliding-up-panel'

const {height} = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative'
    },
    panelHeader: {
        height: 120,
        backgroundColor: '#b197fc',
        alignItems: 'center',
        justifyContent: 'center'
    },
    favoriteIcon: {
        position: 'absolute',
        top: -24,
        right: 24,
        backgroundColor: '#2b8a3e',
        width: 48,
        height: 48,
        padding: 8,
        borderRadius: 24,
        zIndex: 1
    },
    dragHandler: {
        alignSelf: 'stretch',
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc'
    }
}

class SlidingPanel extends React.Component {
    static defaultProps = {
        draggableRange: {
            top: height / 1.75,
            bottom: 120
        }
    }

    state = {
        slideUpPanelvisible: false
    }

    _draggedValue = new Animated.Value(120)

    render() {
        const {top, bottom} = this.props.draggableRange

        const draggedValue = this._draggedValue.interpolate({
            inputRange: [bottom, top],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        const transform = [{scale: draggedValue}]

        return (
            <SlidingUpPanel
                showBackdrop={false}
                allowDragging={true}
                animatedValue={this._draggedValue}
                ref={c => (this._panel = c)}>
                {dragHandler => (
                    <View style={styles.container}>
                        <View style={styles.dragHandler} {...dragHandler}>
                            <Text>Drag handler</Text>
                        </View>
                            <FlatList
                                data={[
                                    {key: 'Devin'},
                                    {key: 'Jackson'},
                                    {key: 'James'},
                                    {key: 'Joel'},
                                    {key: 'John'},
                                    {key: 'Jillian'},
                                    {key: 'Jimmy'},
                                    {key: 'Julie'},
                                    {key: 'Devin'},
                                    {key: 'Jackson'},
                                    {key: 'James'},
                                    {key: 'Joel'},
                                    {key: 'John'},
                                    {key: 'Jillian'},
                                    {key: 'Jimmy'},
                                    {key: 'Julie'},
                                    {key: 'Devin'},
                                    {key: 'Jackson'},
                                    {key: 'James'},
                                    {key: 'Joel'},
                                    {key: 'John'},
                                    {key: 'Jillian'},
                                    {key: 'Jimmy'},
                                    {key: 'Julie'},
                                    {key: 'Devin'},
                                    {key: 'Jackson'},
                                    {key: 'James'},
                                    {key: 'Joel'},
                                    {key: 'John'},
                                    {key: 'Jillian'},
                                    {key: 'Jimmy'},
                                    {key: 'Julie'},
                                ]}
                                renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                            />
                    </View>
                )}
            </SlidingUpPanel>
        )
    }
}

export default SlidingPanel