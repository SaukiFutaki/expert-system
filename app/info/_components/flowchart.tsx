"use client"
import React, { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { DecisionNode, ProcessNode, StartEndNode } from './custom-nodes';
 
const nodeTypes = {
    startEnd: StartEndNode,
    process: ProcessNode,
    decision: DecisionNode,
  };

const initialNodes = [
    { id: "1", position: { x: 0, y: 0 }, data: { label: "Register/Login" }, type: "input" },
    { id: "2", position: { x: 250, y: 100 }, data: { label: "Validasi Input" } },
    { id: "3", position: { x: 250, y: 200 }, data: { label: "Pilih Opsi Layanan" } },
    { id: "4", position: { x: 100, y: 300 }, data: { label: "Proses Konsultasi Sipil" } },
    { id: "5", position: { x: 400, y: 300 }, data: { label: "Proses Layanan Lain" } },
    { id: "6", position: { x: 250, y: 400 }, data: { label: "Hasil" }, type: "output" },
  ];
  const initialEdges = [
    { id: "e1-2", source: "1", target: "2" }, // Koneksi dari Register/Login ke Validasi Input
    { id: "e2-3", source: "2", target: "3" }, // Koneksi dari Validasi Input ke Pilih Opsi Layanan
    { id: "e3-4", source: "3", target: "4" }, // Koneksi dari Pilih Opsi Layanan ke Proses Konsultasi Sipil
    { id: "e3-5", source: "3", target: "5" }, // Koneksi dari Pilih Opsi Layanan ke Proses Layanan Lain
    { id: "e4-6", source: "4", target: "6" }, // Koneksi dari Proses Konsultasi Sipil ke Hasil
    { id: "e5-6", source: "5", target: "6" }, // Koneksi dari Proses Layanan Lain ke Hasil
  ];
export default function FlowChart() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
 
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  return (
    <div className='h-screen w-screen'>
      <ReactFlow
       nodes={nodes}
       edges={edges}
       onNodesChange={onNodesChange}
       onEdgesChange={onEdgesChange}
       onConnect={onConnect}
       nodeTypes={nodeTypes}
       fitView
      >
        <Controls />
        <MiniMap />
        <Background  gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}