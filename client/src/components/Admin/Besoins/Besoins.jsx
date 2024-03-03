import React, { useState, useEffect } from 'react';
import { useColorModeValue, Button, Input, FormControl, FormLabel, Flex, Box, Select } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import { HiDotsVertical } from 'react-icons/hi';
import Sidebar from '../sidebar';
import { format } from 'date-fns';
import { FaSignOutAlt } from 'react-icons/fa';
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import '../../Navbar/Navbar.css';

function Besoins() {
    const [inputValue, setInputValue] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null); // Nouveau state pour l'ID de l'élément sélectionné
    const bg = useColorModeValue("white");
    const history = useNavigate();
    const email = localStorage.getItem('email');

    useEffect(() => {
        fetchItems();
    }, []);

    const handleDelete = async (itemIdToDelete) => {
        try {
            const response = await fetch(`http://localhost:8000/items/${itemIdToDelete}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Failed to delete item');
            }

            console.log('Item deleted successfully');

            fetchItems(); // Mettre à jour la liste des éléments après la suppression

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleUpdate = async (itemId, updatedData) => {
        try {
            const response = await fetch(`http://localhost:8000/items/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            fetchItems();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const handleEdit = (item) => {
        setInputValue(item.name);
        setSelectedType(item.type);
        setSelectedItemId(item._id); // Assurez-vous que l'ID de l'élément est sélectionné pour l'édition
        setIsModalOpen(true);
    };
    const fetchItems = async () => {
        try {
            const response = await fetch('http://localhost:8000/getItems');
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            setItems(data.items);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSave = async () => {
        try {
            if (selectedItemId !== null) {
                await handleUpdate(selectedItemId, { name: inputValue, type: selectedType });
                setSelectedItemId(null);
            } else {
                const response = await fetch('http://localhost:8000/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: inputValue,
                        type: selectedType
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to save item');
                }

                const data = await response.json();
                const newItemId = data.data.item;
                localStorage.setItem('lastCreatedItemId', newItemId);

                setInputValue('');
                setSelectedType('');
                setIsModalOpen(false);
                fetchItems();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };



    const handleLogout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        history("/");
    };

    return (
        <>
            <Sidebar />
            <main>
                <div className='NavBar'>
                    <NavLink to="/besoins" className="Titles">
                        Dashboard
                    </NavLink>

                    <div className='avatar' style={{ display: 'flex', position: 'fixed' }}>
                        <div style={{ marginRight: '30px', marginTop: '10px' }}>
                            <select style={{ padding: '4px', fontSize: '15px' }}>
                                <option>Langue</option>
                                <option>Arabe</option>
                                <option>Français</option>
                            </select>
                        </div>
                        <Menu>
                            <MenuButton as={Avatar}
                                style={{ height: "40px", backgroundColor: "#A0AEC0", borderRadius: "90px", cursor: "pointer", marginRight: "30px" }}
                                src='https://bit.ly/broken-link'
                            />
                            <MenuList >
                                <MenuItem style={{ backgroundColor: 'white', border: "none", mt: "5px", padding: "15px", paddingTop: '10px', fontSize: '16px' }}>
                                    {email}
                                </MenuItem>

                                <MenuItem onClick={handleLogout} style={{ color: "#F87272", backgroundColor: 'white', border: "none", padding: "10px", cursor: "pointer", fontSize: '16px' }}>
                                    <FaSignOutAlt style={{ marginRight: "5px" }} />
                                    <span>Logout</span>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div >

                <Flex justifyContent="flex-end">
                    <Button border='1px solid #cccccc' borderRadius={10} leftIcon={<AddIcon />} ml='4px' fontSize={{ sm: '14px', md: '17px' }} fontWeight={700} onClick={() => setIsModalOpen(true)} backgroundColor="#2B6CB0" color='white' p={10} >Add Item</Button>
                </Flex>
                {items.map((item, index) => (
                    <Flex key={item.id} bg={bg} ml={100} mr={100} mt={15} border="2px solid #bbbbbb" borderRadius={10} padding={8} alignItems="center" justifyContent="space-between">
                        <strong style={{ color: '#364F6B', fontWeight: '600', fontSize: '20px', marginLeft: '10px', marginRight: 'auto' }}>
                            <NavLink to={`/data?project=${item.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>{index + 1}. {item.name}</NavLink>
                        </strong>
                        <strong style={{ padding: '5px', borderRadius: '5px', marginLeft: '-èpx', fontWeight: 'bold', fontSize: '12px', color: '#ffffff', marginBottom: '5px', backgroundColor: item.type === 'consultation' ? '#57cf9f' : '#6c8de9', alignSelf: 'center' }}>
                            {item.type}
                        </strong>
                        <Box style={{ color: '#aaaaaa', fontWeight: '600', fontSize: '15px', marginLeft: 'auto', marginRight: '10px' }}>{format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}</Box>
                        <Menu>
                            <MenuButton as={Box} cursor='pointer'>
                                <HiDotsVertical color="gray" size="20px" />
                            </MenuButton>
                            <MenuList style={{ borderRadius: '15px' }}>
                                <MenuItem
                                    style={{ backgroundColor: 'white', border: 'none', padding: '10px', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}
                                    onClick={() => handleEdit(item)}
                                >
                                    Modifier
                                </MenuItem>
                                <MenuItem style={{ backgroundColor: 'white', border: 'none', padding: '10px', fontSize: '16px', fontWeight: '500', color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item._id)}>Supprimer</MenuItem>
                            </MenuList>
                        </Menu>
                    </Flex>
                ))}
                {isModalOpen && (
                    <Box className='modal'>
                        <Box position="fixed" top="50%" left="50%" transform="translate(-50%, -50%)" bg={bg} p={6} borderRadius={13} height={300} width={320} padding={15}>
                            <FormLabel fontSize={23} fontWeight={500} marginTop={14} marginBottom={10}>Add new item</FormLabel>
                            <FormControl>
                                <FormLabel fontSize={20} fontWeight={500}>Name</FormLabel>
                                <Input
                                    borderRadius={10}
                                    mt={7}
                                    pl={3}
                                    fontSize={17}
                                    fontWeight={400}
                                    height={40}
                                    width="100%"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Enter name..."
                                />
                            </FormControl>
                            <FormControl mt={4}>
                                <FormLabel fontSize={20} fontWeight={500} marginTop={14}>Type</FormLabel>
                                <Select
                                    borderRadius={10}
                                    mt={5}
                                    fontSize={17}
                                    fontWeight={400}
                                    style={{ width: "100%", height: '45px', borderRadius: '10px', fontSize: '17px', margin: '10px 0 0 3px' }}
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    placeholder="Select type..."
                                >
                                    <option value="consultation">Consultation</option>
                                    <option value="Bon de commande">Bon de commande</option>
                                </Select>
                            </FormControl>
                            <Flex justifyContent="center" mt={4}>
                                <Button backgroundColor="blue" width={100} color={'white'} border='none' borderRadius='20' mr={120} mt={20} padding={10} onClick={handleSave}>Save</Button>
                                <Button width={100} color={'white'} border='none' borderRadius='20' backgroundColor="red" mt={20} onClick={() => setIsModalOpen(false)}>Cancel</Button>
                            </Flex>
                        </Box>
                    </Box>
                )}
            </main>
        </>
    );
}

export default Besoins;
