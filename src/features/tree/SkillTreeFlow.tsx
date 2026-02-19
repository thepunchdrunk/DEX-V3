import React, { useMemo } from 'react';
import {
    ReactFlow,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
    Node,
    Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { SkillBranch } from '@/types';

interface SkillTreeFlowProps {
    branches: SkillBranch[];
}

const SkillTreeFlow: React.FC<SkillTreeFlowProps> = ({ branches }) => {
    // Convert SkillBranch[] to React Flow Nodes & Edges
    const { initialNodes, initialEdges } = useMemo(() => {
        const nodes: Node[] = [];
        const edges: Edge[] = [];

        // Simple radial logic (simplified for initial implementation)
        const centerX = 400;
        const centerY = 300;

        // Root Node (You)
        nodes.push({
            id: 'root',
            type: 'input',
            data: { label: 'You' },
            position: { x: centerX, y: centerY },
            style: {
                background: '#E60000',
                color: 'white',
                width: 60,
                height: 60,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
            }
        });

        // Helper to process branches recursively
        const processBranch = (branch: SkillBranch, parentId: string, angleStart: number, angleEnd: number, depth: number) => {
            const id = branch.id;
            const angle = (angleStart + angleEnd) / 2;
            const radius = 150 * depth;

            const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
            const y = centerY + Math.sin(angle * Math.PI / 180) * radius;

            // Health color mapping
            let bg = '#E0E0E0';
            if (branch.health === 'THRIVING') bg = '#4CAF50';
            if (branch.health === 'HEALTHY') bg = '#66BB6A';
            if (branch.health === 'FADING') bg = '#60A5FA';
            if (branch.health === 'DECAYED') bg = '#9E9E9E';

            nodes.push({
                id,
                data: { label: branch.name },
                position: { x, y },
                style: {
                    background: bg,
                    color: 'white',
                    padding: '10px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    width: 120,
                    textAlign: 'center',
                    border: 'none',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }
            });

            edges.push({
                id: `${parentId}-${id}`,
                source: parentId,
                target: id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#CBD5E1' }
            });

            if (branch.children && branch.children.length > 0) {
                const sectorSize = (angleEnd - angleStart) / branch.children.length;
                branch.children.forEach((child, i) => {
                    processBranch(
                        child,
                        id,
                        angleStart + (i * sectorSize),
                        angleStart + ((i + 1) * sectorSize),
                        depth + 1
                    );
                });
            }
        };

        // Process top-level branches (distributed in circle)
        const sector = 360 / branches.length;
        branches.forEach((branch, i) => {
            processBranch(branch, 'root', i * sector, (i + 1) * sector, 1);
        });

        return { initialNodes: nodes, initialEdges: edges };
    }, [branches]);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    return (
        <div style={{ width: '100%', height: '500px', background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
                attributionPosition="bottom-right"
            >
                <Controls />
                <Background color="#F8F9FA" gap={16} />
                <MiniMap style={{ height: 100 }} zoomable pannable />
            </ReactFlow>
        </div>
    );
};

export default SkillTreeFlow;
