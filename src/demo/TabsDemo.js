import React, { useEffect } from 'react'
import { Card, Tabs } from '../lib'
import useTitle from './useTitle'

const TabsDemo = () => {
    const [, setTitle] = useTitle()
    useEffect(() => setTitle('Tabs'))
    const tabs = Tabs.Context(0)

    return (
        <div className='component'>
            <h2>Tabs</h2>
            <div>
                <Card>
                    <Tabs tabs={tabs}>
                        <Tabs.Tab>Page 1</Tabs.Tab>
                        <Tabs.Tab>Page 2</Tabs.Tab>
                    </Tabs>
                    <Tabs.Pages tabs={tabs}>
                        <Tabs.Page>
                            <Card.Title>
                                Page 1
                            </Card.Title>
                            <Card.Content>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda commodi
                                deserunt
                                dolorem ducimus error exercitationem fugiat id inventore ipsa iure laboriosam maiores
                                nam
                                nesciunt
                                nostrum, odio officiis quaerat, vel.
                            </Card.Content>
                        </Tabs.Page>
                        <Tabs.Page>
                            <Card.Title>
                                Page 2
                            </Card.Title>
                            <Card.Content>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda commodi
                                deserunt
                                dolorem ducimus error exercitationem fugiat id inventore ipsa iure laboriosam maiores
                                nam
                                nesciunt
                                nostrum, odio officiis quaerat, vel.
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab animi, ipsa iusto magni
                                quaerat
                                qui sed temporibus unde ut veniam. At beatae dignissimos ea eum nobis sit tempore,
                                veniam
                                veritatis?
                            </Card.Content>
                        </Tabs.Page>
                    </Tabs.Pages>
                </Card>
            </div>
            <pre>{``}</pre>
        </div>
    )
}

export default TabsDemo