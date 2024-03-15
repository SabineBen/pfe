import React, { useState } from 'react';
import { Box, Button, Flex, Input, Text, useColorModeValue } from '@chakra-ui/react';
import Sidebar from '../sidebar';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowRightIcon } from '@chakra-ui/icons';

function Data() {
    const location = useLocation();
    const projectName = new URLSearchParams(location.search).get('project');
    const bg = useColorModeValue("white");

    const [rowData, setRowData] = useState([{ index: 1, fieldName: '', fieldValue: '' }]);

    const addRow = () => {
        const newRow = { index: rowData.length + 1, fieldName: '', fieldValue: '' };
        setRowData([...rowData, newRow]);
    };

    const removeRow = (indexToRemove) => {
        const updatedRows = rowData.filter((row) => row.index !== indexToRemove);
        setRowData(updatedRows);
    };

    const handleFieldNameChange = (index, e) => {
        const updatedRows = [...rowData];
        updatedRows[index].fieldName = e.target.value;
        setRowData(updatedRows);
    };

    const handleFieldValueChange = (index, e) => {
        const updatedRows = [...rowData];
        updatedRows[index].fieldValue = e.target.value;
        setRowData(updatedRows);
    };

    return (
        <>
            <Sidebar />
            <main>
                <div className='NavBar'>
                    <NavLink to='' className="Titles">
                        Dashboard
                    </NavLink>
                </div>
                <h3 style={{ color: '#364F6B', cursor: 'pointer', width: '250px', marginLeft: '25px' }}>Dashboard<ArrowRightIcon style={{ fontSize: '10px', marginLeft: '3px', marginRight: '3px' }} />{projectName}</h3>

                <Box mx="auto" mt={5} bg={bg} maxW="90%" overflowX="auto" border='2px solid #cccccc' padding='15px' borderRadius={10}>
                    <table>
                        <thead>
                            <tr style={{ fontSize: '16px', fontFamily: 'sans-serif' }}>
                                <th>Item</th>
                                <th>Les besoins</th>
                                <th>Devis</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowData.map((row, index) => (
                                <tr key={index}>
                                    <td>
                                        <Input
                                            mt={7}
                                            pl={3}
                                            ml={10}
                                            fontSize={17}
                                            fontWeight={400}
                                            height={30}
                                            width='60px'
                                            value={row.index}
                                            readOnly
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            mt={7}
                                            ml={10}
                                            mr={10}
                                            pl={3}
                                            fontSize={17}
                                            fontWeight={400}
                                            height={30}
                                            width='430px'
                                            value={row.fieldName}
                                            onChange={(e) => handleFieldNameChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <Input
                                            mt={7}
                                            pl={3}
                                            fontSize={17}
                                            fontWeight={400}
                                            height={30}
                                            width='430px'
                                            value={row.fieldValue}
                                            onChange={(e) => handleFieldValueChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <Flex>
                                            <Button onClick={() => addRow()} colorScheme="blue" size="sm" mr={2} width='12px' marginRight={3} backgroundColor='white' marginLeft={3}>
                                                +
                                            </Button>
                                            {rowData.length > 1 && (
                                                <Button onClick={() => removeRow(row.index)} colorScheme="red" size="sm" width='12px' backgroundColor='white'>
                                                    -
                                                </Button>
                                            )}
                                        </Flex>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </Box>
            </main>
        </>
    );
}

export default Data;
