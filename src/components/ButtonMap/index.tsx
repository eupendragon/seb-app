import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useArea } from '../../utils/contexts/area';

const svg = {
    BG: "M119.135 0.600499C117.112 -0.575548 114.982 0.136706 112.927 1.35416L1.54894 67.0886C-0.498326 68.2977 -0.52309 70.2357 1.51592 71.4118L201.678 187.385C203.717 188.561 207.019 188.528 209.074 187.327L320.444 121.576C322.508 120.367 322.516 118.429 320.485 117.253L119.135 0.600499Z",
    BULLET_BG: "M21.204 40.4472C26.3121 35.9089 35.4 26.6371 35.4 18.1286C35.4 13.4208 33.547 8.90581 30.2498 5.57691C26.9522 2.24801 22.4797 0.377808 17.8162 0.377808C13.1527 0.377808 8.6802 2.24801 5.3826 5.57691C2.0849 8.90581 0.232399 13.4208 0.232399 18.1286C0.232399 26.6371 9.3173 35.9089 14.4284 40.4472C15.3606 41.2872 16.5666 41.7515 17.8162 41.7515C19.0658 41.7515 20.2717 41.2872 21.204 40.4472Z",
    LETTER_A: "M10.6557 25.5495L16.4557 11.5495H18.3157L24.0757 25.5495H22.3957L20.6357 21.1495H14.0357L12.2557 25.5495H10.6557ZM14.5757 19.8295H20.0957L17.3357 12.9695L14.5757 19.8295Z",
    LETTER_B: "M12.416 25.2324V11.2324H18.096C19.003 11.2324 19.783 11.379 20.436 11.6724C21.103 11.9657 21.616 12.3857 21.976 12.9324C22.336 13.4657 22.516 14.099 22.516 14.8324C22.516 15.5524 22.323 16.179 21.936 16.7124C21.563 17.2457 21.043 17.6524 20.376 17.9324C21.216 18.1857 21.876 18.6057 22.356 19.1924C22.85 19.779 23.096 20.479 23.096 21.2924C23.096 22.0924 22.896 22.7924 22.496 23.3924C22.11 23.979 21.556 24.4324 20.836 24.7524C20.13 25.0724 19.296 25.2324 18.336 25.2324H12.416ZM13.956 17.3324H18.016C18.923 17.3324 19.643 17.119 20.176 16.6924C20.723 16.2657 20.996 15.6857 20.996 14.9524C20.996 14.219 20.723 13.639 20.176 13.2124C19.643 12.7857 18.923 12.5724 18.016 12.5724H13.956V17.3324ZM13.956 23.8924H18.216C19.23 23.8924 20.036 23.6524 20.636 23.1724C21.236 22.6924 21.536 22.0524 21.536 21.2524C21.536 20.4524 21.236 19.8124 20.636 19.3324C20.036 18.8524 19.23 18.6124 18.216 18.6124H13.956V23.8924Z",
    LETTER_C: "M18.901 25.758C17.888 25.758 16.941 25.578 16.061 25.218C15.181 24.844 14.408 24.331 13.741 23.678C13.075 23.011 12.555 22.244 12.181 21.378C11.821 20.498 11.641 19.551 11.641 18.538C11.641 17.524 11.821 16.584 12.181 15.718C12.555 14.838 13.075 14.071 13.741 13.418C14.408 12.751 15.181 12.238 16.061 11.878C16.941 11.504 17.888 11.318 18.901 11.318C19.635 11.318 20.335 11.411 21.001 11.598C21.681 11.771 22.308 12.031 22.881 12.378C23.468 12.711 23.988 13.124 24.441 13.618L23.421 14.698C22.875 14.071 22.201 13.591 21.401 13.258C20.601 12.911 19.768 12.738 18.901 12.738C18.088 12.738 17.335 12.884 16.641 13.178C15.948 13.471 15.341 13.884 14.821 14.418C14.315 14.938 13.915 15.551 13.621 16.258C13.341 16.951 13.201 17.711 13.201 18.538C13.201 19.351 13.341 20.111 13.621 20.818C13.915 21.524 14.321 22.144 14.841 22.678C15.361 23.198 15.968 23.604 16.661 23.898C17.368 24.191 18.128 24.338 18.941 24.338C19.808 24.338 20.635 24.171 21.421 23.838C22.208 23.491 22.868 23.018 23.401 22.418L24.401 23.458C23.935 23.938 23.408 24.351 22.821 24.698C22.248 25.044 21.628 25.311 20.961 25.498C20.295 25.671 19.608 25.758 18.901 25.758Z",
    A: "M116.625 5.02309L126.886 10.9696L104.746 67.1796L49.3049 92.8042L7.19554 68.4054L116.625 5.02309Z",
    B: "M215.794 62.4672L132.648 14.3073L118.26 50.8558L109.732 72.5133L57.2793 97.4173L168.864 162.05L193.72 147.432L199.564 131.291L202.041 125.17L217.329 87.3878L225.205 67.9251L215.794 62.4672Z",
    C: "M273.926 96.1415L267.083 92.1744L258.465 87.1803L231.008 71.3037L222.737 90.6174L197.946 151.929L174.758 165.462L205.533 183.293L246.569 159.524L253.652 155.416L314.963 119.911L273.926 96.1415Z"
}   

export default function ButtonMap() {
    const { selectedArea, setSelectedArea } = useArea()

    const handleSelectArea = (areaId: 'A' | 'B' | 'C') => {
        setSelectedArea(areaId)
    }

    return (
        <View className="flex-1 items-center">
            <Svg height={180} width={300} viewBox="0 0 322 189">
                <Path d={svg.BG} fill="#CCCCCC"/>
                <MapArea d={svg.A} areaId="A" onPress={() => handleSelectArea('A')} selectedArea={selectedArea}/>
                <MapArea d={svg.B} areaId="B" onPress={() => handleSelectArea('B')} selectedArea={selectedArea}/>
                <MapArea d={svg.C} areaId="C" onPress={() => handleSelectArea('C')} selectedArea={selectedArea}/>
                <BulletArea d={{bullet: svg.BULLET_BG, letter: svg.LETTER_A}} coords={{ x: 60, y: 10 }} areaId="A" selectedArea={selectedArea}/>
                <BulletArea d={{bullet: svg.BULLET_BG, letter: svg.LETTER_B}} coords={{ x: 130, y: 50 }} areaId="B" selectedArea={selectedArea}/>
                <BulletArea d={{bullet: svg.BULLET_BG, letter: svg.LETTER_C}} coords={{ x: 220, y: 100 }} areaId="C" selectedArea={selectedArea}/>
            </Svg>
        </View>
    )
}

type BulletAreaProps = {
    d: {
        bullet: string 
        letter: string
    } 
    coords: {
        x: number 
        y: number 
    },
    areaId: 'A' | 'B' | 'C'
    selectedArea: 'A' | 'B' | 'C' | null
}

const BulletArea = ({ d, areaId, selectedArea, coords: { x, y }}: BulletAreaProps) => {
    const isSelected = areaId === selectedArea

    return(
        <>
            <Path d={d.bullet} fill={isSelected && areaId ? '#084B51' : '#CECECE'} x={x} y={y}/>
            <Path d={d.letter} fill="white" x={x} y={y}/>
        </>
    )
}

type MapAreaProps = {
    d: string
    areaId: 'A' | 'B' | 'C'
    selectedArea: 'A' | 'B' | 'C' | null
    onPress: (areaId: 'A' | 'B' | 'C') => void
}

const MapArea = ({  d, areaId, selectedArea, onPress }: MapAreaProps) => {
    const isSelected = areaId === selectedArea

    return <Path d={d} fill={isSelected && areaId ? '#40A79B' : '#FFFFFF'} onPress={() => onPress(areaId)} />
}