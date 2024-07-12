import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import { saveAs } from 'file-saver';
import { toSvg } from 'html-to-image';

const Container = styled.div`
  display: flex;
  height: 100vh;
  background: #f0f2f5;
`;

const Sidebar = styled.div`
  width: 300px;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-right: 1px solid #e0e0e0;
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  margin-top: 5px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

const WaveGenerator = () => {
    const [waves, setWaves] = useState(3);
    const [layers, setLayers] = useState(2);
    const [height, setHeight] = useState(150);
    const [color, setColor] = useState('#ff6b6b');
    const [secondaryColor, setSecondaryColor] = useState('#f06595');
    const [gradient, setGradient] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [flip, setFlip] = useState(false);

    const wavePath = (index, width, frequency, offset) => {
        let path = `M0,${height}`;
        const waveHeight = height / layers;
        const waveOffset = index * waveHeight;

        for (let x = 0; x <= width; x += 10) {
            const y = Math.sin((x + offset) / frequency) * (waveHeight / 2) + waveOffset;
            path += ` L${x},${y}`;
        }

        return `${path} L${width},${height} L0,${height} Z`;
    };

    const { offset } = useSpring({
        from: { offset: 0 },
        to: { offset: 600 },
        reset: true,
        reverse: true,
        config: { duration: 5000 },
        loop: animate,
    });

    const handleExport = async (type) => {
        const svg = document.querySelector('svg');
        if (type === 'svg') {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            saveAs(blob, 'wave.svg');
        } else if (type === 'png') {
            const dataUrl = await toSvg(svg);
            saveAs(dataUrl, 'wave.png');
        }
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleSecondaryColorChange = (event) => {
        setSecondaryColor(event.target.value);
    };

    return (
        <Container>
            <Sidebar>
                <h2>Generate SVG Waves</h2>
                <Label>Waves:</Label>
                <Input type="range" min="1" max="5" value={waves} onChange={(e) => setWaves(parseInt(e.target.value))} />
                <Label>Layers:</Label>
                <Input type="range" min="1" max="5" value={layers} onChange={(e) => setLayers(parseInt(e.target.value))} />
                <Label>Height:</Label>
                <Input type="range" min="50" max="300" value={height} onChange={(e) => setHeight(parseInt(e.target.value))} />
                <Label>Color:</Label>
                <Input type="color" value={color} onChange={handleColorChange} />
                {gradient && <Input type="color" value={secondaryColor} onChange={handleSecondaryColorChange} />}
                <Button onClick={() => setGradient(!gradient)}>Toggle Gradient</Button>
                <Button onClick={() => setAnimate(!animate)}>Toggle Animation</Button>
                <Button onClick={() => setFlip(!flip)}>Flip</Button>
                <Button onClick={() => handleExport('svg')}>Export as SVG</Button>
                <Button onClick={() => handleExport('png')}>Export as PNG</Button>
            </Sidebar>
            <Main>
                <Svg viewBox="0 0 600 300" style={{ transform: flip ? 'scaleY(-1)' : 'scaleY(1)' }}>
                    {[...Array(layers)].map((_, i) => (
                        <animated.path
                            key={i}
                            d={wavePath(i, 600, 50, offset.get())}
                            fill={gradient ? `url(#gradient)` : color}
                            style={animate ? { willChange: 'transform' } : {}}
                        />
                    ))}
                    {gradient && (
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
                            </linearGradient>
                        </defs>
                    )}
                </Svg>
            </Main>
        </Container>
    );
};

export default WaveGenerator;
