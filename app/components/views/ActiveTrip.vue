<template>
    <Page class="page">
        <ActionBar title="Active Trip">
        </ActionBar>
        <ScrollView>
            <StackLayout orientation="vertical" width="*" height="*"
                backgroundColor="lightgray">
                <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Snp2FzERPRkmWHji2mDSllE84xMlaLNpubYnDp2umpnOnk92" />

                <Button text="End" width="400" height="20%" backgroundColor="darkgreen"
                    marginTop="20" textAlignment="center" color="white"
                    fontSize="40" fontWeight="bold" borderRadius="30" @tap="$goto('Home')" />
                <Button text="Alert" width="400" height="20%"
                    backgroundColor="darkgreen" marginTop="20" textAlignment="center"
                    color="white" fontSize="40" fontWeight="bold"
                    borderRadius="30" @tap="$goto('PlaceHolderForPopUp')" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import Vue from "nativescript-vue"; 
    export default {
        methods: {
            onViewButtonClick() {
                
            }
        },
        data() {
            return {
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>